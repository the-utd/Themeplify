const path			= require('path');
const { themeRoot }	= themeplify;
const {
	gulp,
	axios,
	webpack,
	gulplog,
	ansi,
	browserSync,
	webpackDevMiddleware,
	webpackHotMiddleware,
	serveStatic
} = themeplify.packages;

const {
	rewriteRule,
	entries,
	errorLogger
}	= themeplify.helpers;
const webpackConfig 			= themeplify.options.webpack;
const argv 						= themeplify.args;

let browserSyncServer = null;
const createServer = async () => {
	const config = themeplify.options.themekit;

	try {
		let port = argv.port || 3000;

		if(!config.store) {
			return;
		}

		const shop = await axios(`https://${config.store}/admin/api/2020-07/shop.json?fields=id,domain`, {
			method: "GET",
			responseType: "json",
			headers: {
				'X-Shopify-Access-Token': config.password,
				'Content-Type': 'application/json',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
			}
		}).then(response => response.data).then(response => response.shop);

		let preview_url = `https://${shop.domain ? shop.domain : config.store}/?preview_theme_id=${config["theme_id"]}`;
		if(argv.preview && config["preview_url"]) {
			preview_url = config["preview_url"];
		}

		const options = {
			hot: true, // should always be true --- BrowserSync without HMR is pretty pointless
			inline: true,
			devServer: true,
			browserSync: true
		};

		const rewriteRules = [
			rewriteRule(/(http:|https:)?\/\/([-\w.]+)\/(?<folder>(?!shopifycloud)(?!s\/javascripts)(?!s\/assets\/storefront)\w+\/)+(?<file>(?!shop_events_listener)[-\w^&'@{}[\],$=!#().]+)(\?((v=)?\d+))?/gm, port),
			{
				match: new RegExp(`(http:|https:)?//${config.shop}`, 'gm'),
				fn: function (req, res, match) {
					return `https://${req.headers.host}`
				}
			},
			...(shop.domain ? [
				{
					match: new RegExp(`(http:|https:)?//${shop.domain}`, 'gm'),
					fn: function (req, res, match) {
						return `https://${req.headers.host}`
					}
				}
			] : [])
		];

		const bundler = webpack({
			...webpackConfig,
			stats: "detailed",
			mode: "development",
			entry: () => {
				const entryFiles = entries("src/scripts/**.js");

				return {
					webpackHotMiddleware: 'webpack-hot-middleware/client?reload=true',
					...(Object.keys(entryFiles).reduce((entries, key) => {
						return {
							...entries,
							[key]: [`webpack-hot-middleware/client?name=${key}`, entryFiles[key]]
						}
					}, {})),
				}
			}
		});

		if(!bundler.getInfrastructureLogger) {
			bundler.getInfrastructureLogger = () => {
				return console;
			}
		}

		const middleware = [
			webpackDevMiddleware(bundler, {
				// IMPORTANT: dev middleware can't access config, so we should
				// provide publicPath by ourselves
				publicPath: webpackConfig.output.publicPath,
				index: false,
				// pretty colored output
				stats: {
					colors: true,
					hash: false,
					version: false,
					timings: false,
					assets: false,
					chunks: false,
					modules: false,
					reasons: false,
					children: false,
					source: false,
					errors: true,
					errorDetails: true,
					warnings: false,
					publicPath: false
				},
				mimeTypes: {
					'application/wasm': ['wasm']
				}
				// for other settings:
				// @see https://webpack.js.org/guides/development/#webpack-dev-middleware
			}),
		];

		if (options.hot === true) {
			// bundler should be the same as above
			middleware.push(webpackHotMiddleware(bundler, {
				log: () => {},
				publicPath: webpackConfig.output.publicPath,
			}));
		}

		middleware.push(serveStatic(path.join(themeRoot, '/dist'), {
			index: false,
			redirect: false
		}));

		const queryStringComponents = ['_ab=0', 'pb=0', '_fd=0', '_sc=1'];
		const browserSyncCallback 	= async function () {
			gulplog.info(`Preview: ${preview_url}`);
		};

		const browserSyncOptions = {
			port: port,
			notify: false,
			directory: true,
			open: !browserSyncServer,
			proxy: {
				target: preview_url,
				cookies: {
					stripDomain: false
				},
				ws: true,
				middleware: [
					...middleware,
					function(req, res, next) {
						const prefix = req.url.indexOf('?') > -1 ? '&' : '?';
						req.url += prefix + queryStringComponents.join('&');
						next();
					}
				],
				proxyRes: [
					function(proxyRes) {
						// disable HSTS. Slate might force us to use HTTPS but having HSTS on local dev makes it impossible to do other non-Slate dev.
						delete proxyRes.headers['strict-transport-security'];
					},
				],
			},
			ghostMode: false,
			stream: true,
			logSnippet: false,
			snippetOptions: {
				// fix https://community.shopify.com/c/Technical-Q-A/Unknown-error-using-Slate-and-Browser-Sync/td-p/564376
				rule: {
					match: /<head[^>]*>/i,
					fn: function(snippet, match) {
						return match + snippet;
					}
				}
			},
			rewriteRules: rewriteRules
		};

		browserSyncServer = browserSync.create();
		browserSyncServer.init(browserSyncOptions, browserSyncCallback)
	} catch (error) {
		gulplog.error(ansi.red(error.message));
	}
};

const server = async () => {
	await createServer();

	const reloadServer = async () => {
		if(browserSyncServer) {
			await browserSyncServer.exit();
		}

		await createServer();
	};

	reloadServer.displayName = "reload:server";
	gulp.watch("./src/scripts/*.js").on("all", function (event, file) {
		if(!["add", "unlink"].includes(event)) {
			return;
		}

		gulp.series([
			reloadServer
		])(errorLogger);
	});
}

server.displayName = "server";

module.exports = server;
