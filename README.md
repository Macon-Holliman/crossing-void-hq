![Crossing Void: HQ Logo](https://i.imgur.com/gANSwSe.png)

# Crossing Void: HQ

Create and share compositions for Crossing Void Global, see base stats as well as in-depth comparisons of stats and skill damage. 

Online at: [Crossing Void: HQ](https://crossingvoidhq.com/).  

## Open Source - Want to contribute?

Currently the overall structure is a mess as I was constantly testing to discover all of the needed values and formulas and making updates in the beginning.

I plan to clean up the code and make it more encapsulated, as is expected with a React project, in the near future. 

However, for the time being, contributions are still welcomed!

## Assets

* All character and item images belong to ©SEGA, ©2017 KADOKAWA ASCII MEDIA WORKS, and ©91Act

* The Crossing Void: HQ logo as well as any other graphics on the site were made by myself.

## Data

You'll find all the relevant data needed for calculations in the ./src/data directory.

Using their name and role, you can combine any data between the .json 's you find there.

## Notes about Formulas and Stats

Get in contact with me for the full breakdown of the stats so far (Which you can find in the various .json 's in the data folder) for more info.

The game doesen't release stats publicly, so they're approximations, however they are very close and when the formulas are applied, those slight differences of +/-0.5 from base stats become increasingly negligble.

While the formulas aren't concisely written out anywhere yet, inside of the 'stats' component you'll find a variety of functions for calculating the many different variables that go into character growth.

Likewise, formulas for how damage is calculated with all the different variables are found in the 'skills' component.

The growth for character development is still unknown asthe slight variation between characters/roles has made this difficult to figure out. You'll find a few different places where there are numbers going out to 10+ decimal places to simulate their exponential growth function with high accuracy.

## Contact me

If you want to contact me for more information:

E-Mail: maconholliman@gmail.com

Please use [Github Issues](https://github.com/Macon-Holliman/crossing-void-hq/issues) for bug reports, feature requests, etc.

## License

[Mozilla Public License v2](https://tldrlegal.com/license/mozilla-public-license-2.0-(mpl-2))
