# core_default_image

Uses port 9000

Depends on shell execution via named pipe AUTOMATE_DOCKER_PIPE

Packages idea:
~~~~
{
   "save": ["path/to/some/volume", "another_volume/path"],
}

// save will take those folders, zip them all up
// can download those folders through the ui
// need some way to upload the data to then
// automate.pak is the folder that we get mounted it the volume
// then you could upload multiple automate.paks and move between them easily.

/automate_controller (volume for automate)

		/automate_0.1
			volumes/
				automate.pak // zipped folder structure that gets mounted on file system
				automate2.pak
			config/
				image.png
				docker-compose.yml
				config.json
		/automate_0.2
			volumes/
				automate.pak	

		/stork_0.2
			volumes/
				stork.pak
		
~~~~
