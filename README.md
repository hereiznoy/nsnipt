# nsnipt

At its core, nsnipt is a Node CLI that interacts with [Snipt.net](https://snipt.net). Currently however it only supports one operation; saving your snipts (code snippets) as text files in a location of your choosing.

I created nsnipt simply because I wanted a way to easily export my snipts for backup (and because I wanted to try writing a nodejs command-line app). As I or others find need I will definitely expand the functionality.

## Command Line Options and Persistent Config

To use this client you'll need to provide two required pieces of information:

1. Your Snipt _username_
2. Your Snipt _API key_ 

These can be found in your Snipt.net account information.

You can set all options in a couple different ways.

### Setting Options via the Command Line

All options can be set via command line options; for example:

> nsnipt backup -u hereiznoy -a 123456ABCDEFG -d /some/where

### Setting Options via the Config File

If you want to store your options (which you most likely will) you can do so by putting a __config.json__ file in the _config_ directory of your nsnipt install. Your config file should look something like this:

	{
		"username": "hereiznoy",
		"apiKey": "123456ABCDEFG",
		"backup": {
			"backupDir": "/some/where"
		}
	}

Notice the _backupDir_ option is contained inside the _backup_ JSON object; that is because it's an option specific to the backup command.

### Default Options

If you do not set the required options via command line args or the config file, the client will not run.

Any optional options can be left off (such as the __-d__ backup directory location option), in which case default values will be used (look at the _config/config.js_ source file if you want to know what the defaults are).

## Installation

> npm install -g nsnipt

## Running

Again, currently the only operational command the client supports is _backup_.

> nsnipt backup -d /path/to/backup/dir