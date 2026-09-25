# Quagsire

A small static fan site with a Quagsire artwork gallery and a [Poké Lid field guide](lids.html).

The field guide pairs 19 lid images with precise coordinates from [Pokémon Local Acts](https://local.pokemon.jp/en/manhole/kochi.html), including the Utazu lid in Kagawa. Its MapLibre map uses the public [OpenFreeMap](https://openfreemap.org/) style and custom lid artwork markers; neither the map nor its location links use a Google account, API key, or account-owned map. Selecting a lid focuses the map on its location. Location links and five route links open Google Maps using coordinates. Each route link has at most three intermediate stops so it works in mobile browsers.

Open `index.html` or `lids.html` in a browser, or serve this directory with any static file server. The field guide needs an internet connection for MapLibre, OpenFreeMap, Google Maps links, and official lid artwork. MapLibre displays OpenFreeMap's OpenMapTiles and OpenStreetMap attribution automatically. `data/quagsire-lids.csv` and `data/quagsire-lids-icons.kml` contain the 19 verified locations and artwork references used by the map.
