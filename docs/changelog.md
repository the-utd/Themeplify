# Changelog

## Version 1.0.28

### Changed

 - Changed rule for asset urls due to Shopify changes

Builder stops replacing files when working on localhost. This change fixes the replacement of assets and now the CDN domain is not hardcoded. This solution is unified and works both with the old type of CDNs and with the new one.

Shopify asset URLs changes which will be applied on Jun 22, 2023 - [Changes to Asset URLs](https://changelog.shopify.com/posts/changes-to-asset-urls)
