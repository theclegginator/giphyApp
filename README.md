# giphyApp
An app that displays topical GIFs from the GIPHY API

# How it Works
This application uses the standard GIPHY API to pull GIPHY GIFs from the GIPHY website.

Buttons with topics are created at the top of the page via a Javascript jQuery loop. The user may choose to add a topic to the list of their own choosing.

Once a button is pressed, GIFs featuring the denoted topic will be generated on the page. The GIFs are all held within a div element for that topic, and the topic title is prepended to the top of the group of GIFs.

The GIFs are static by default, but by clicking on the GIF, they will animate. Clicking again will pause the GIF. 
