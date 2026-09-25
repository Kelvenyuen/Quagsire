# Quagsire

A small static fan site with a Quagsire artwork gallery and a [Poké Lid field guide](lids.html).

The field guide pairs 19 lid images with precise coordinates from [Pokémon Local Acts](https://local.pokemon.jp/en/manhole/kochi.html), including the Utazu lid in Kagawa. Its [custom Google My Maps map](https://www.google.com/maps/d/viewer?mid=1fMK1to6Zo9AwJS7-wzFM5aTQvJJMiLk) shows all 19 locations with their respective lid images as marker icons. Selecting any lid focuses the embedded map on its location. Five route links open driving directions in Google Maps. Each link has at most three intermediate stops so it works in mobile browsers.

Open `index.html` or `lids.html` in a browser, or serve this directory with any static file server. The field guide needs an internet connection for Google Maps and official lid artwork. `data/quagsire-lids.csv` and `data/quagsire-lids-icons.kml` contain the 19 verified locations and artwork references used to build the custom map.
