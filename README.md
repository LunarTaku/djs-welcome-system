![Image](https://cdn.discordapp.com/attachments/1007859633400053863/1009080383280783360/WelcomeSys-IMG.jpg)

# djs-welcome-system v2
This system allows you to greet members when they join your server, full multi guild setup with add, remove, and replace channel commands!

# V2 Changelog
- Added leave messages thanks to Ducko#7068 on discord.
- Fixed some `Unkown Interaction` errors.

## Dependencies:
> mongoose => `npm i mongoose`
> chalk => `npm i chalk@4.1.2`
> dotenv => `npm i dotenv`

# Instructions:
> 1. Place the commands into your commands folder.
> 2. Place the events in your events folder.
> 3. Create a new folder in the bot root direcatory and name it "schemas", and than place the schema in there.
> 4. Change all the paths to the right ones if needed.

# MongoDB Connection:
> be sure to add this to your ready.js file.
```
    // Add this to the top of the file
    const { connect } = require('mongoose')
    const chalk = require("chalk")
    
    // Add this to your ready.js file
    await connect(MONGO_URI)
      .then(() => {
        console.log(chalk.yellow(`✅ >>> Successfully connected to MongoDB!`));
      })
      .catch((err) => {
        console.log(err);
      });
```

# Contributing:
> if you want to contribute create a fork of this project and when you are done editing it update the fork and create a pull request.
