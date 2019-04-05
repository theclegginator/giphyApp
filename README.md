# giphyApp
An app that displays topical GIFs from the GIPHY API

# How it Works
This application uses the standard GIPHY API to pull GIPHY GIFs from the GIPHY website.

Buttons with topics are created at the top of the page via a Javascript jQuery loop. The user may choose to add a topic to the list of their own choosing.

Once a button is pressed, GIFs featuring the denoted topic will be generated on the page. The GIFs are all held within a div element for that topic, and the topic title is prepended to the top of the group of GIFs.

The GIFs are static by default, but by clicking on the GIF, they will animate. Clicking again will pause the GIF. 

# Favorites
By clicking the star in the upper left corner of every GIF, you can append it to a favorites section that will stay there unless you hit the "Clear GIFs" button.

By clicking the star again once it's in your favorites section, you can remove it from the favorites.

# Extra GIFs
A counter is saved to each topic button. By hitting the button again, you will alter the pagination offset in the GIPHY API by 10 to receive a fresh batch of 10 new GIFs. The offset counter is unique to each topic upon loading the page.
