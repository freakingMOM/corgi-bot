const discord = require ('discord.js');

var client = new discord.Client();

const token = "NTkzNTUxMDkxNjgxOTg0NTU5.XRRxpw.ZCRx3wNgoR1hGY4YPZY6LmXDYtA";

client.on("ready", () => {
    console.log ("ready!");

answered = true;
cAnswer = "";
userAnswer= "";

    client.user.setGame ("corgi. is my prefix");
});

const fs = require("fs");
client.msgs = require ("./msgs.json");

client.on ("guildMemberAdd", member => {

  var role = member.guild.roles.find ("name", "testRole");
  member.addRole (role);

})

client.on ("guildMemberRemove", member => {

})

const prefix = "corgi."
client.on ("message", (message) => {

  if (message.author.bot) return;

  msg = message.content.toLowerCase();

mention = message.mentions.users.first();

if (msg.startsWith (prefix + "send")) {
    if (mention == null) { return; }
    message.delete();
    menstionMessage = message.content.slice (10);
    mention.sendMessage (menstionMessage);
    message.channel.send ("done!")
}

  if (msg.startsWith (prefix + "hello")) {
    // 1000 - 1 sec
      message.delete (3000);
      message.reply ("Hey!").then(d_msg => { d_msg.delete(3000); });

      message.channel.send ("message: " + message);
      message.channel.send ("message sender: " + message.author.username);
      message.channel.send ("message sender ID: " + message.author.id);
  }

  if (message.content.startsWith ("👀")) {
      message.channel.send (":eyes:");
      let emojicounter = client.msgs["counter"].eyesEmoji;
      client.msgs ["counter"] = {
          eyesEmoji: emojicounter + 1
      }
      fs.writeFile ("./msgs.json", JSON.stringify (client.msgs, null, 4), err => {
          if (err) throw err;
          message.channel.send ("emoji counted");
      });
  }

  if (msg.startsWith ("c0rgi")) {
      message.channel.send ("who dosnt't like corgi's", {files: ["./images/corgi.png"]});
  }

  if (msg.startsWith ("write")) {
      editedmessage = message.content.slice (6);

      client.msgs [message.author.username] = {
          message: editedmessage
      }
      fs.writeFile ("./msgs.json", JSON.stringify (client.msgs, null, 4), err => {
          if (err) throw err;
          message.channel.send ("message written");
      });

    }

    if (msg.startsWith ("get")) {
        let _message = client.msgs[message.author.username].message;
        message.channel.send ("mesage is : " + _message);
    }

if (msg.startsWith (prefix + "8ball")) {
    ballMessage = message.content.slice (9); //corgi.8ball
    nubmer = 2;
    var random = Math.floor (Math.random() * (number - 1 + 1)) + 1;
    switch (random) {
        case 1: message.channel.send ('the 8ball says that"' + ballMessage + '"will come to pass'); break;
        case 2: message.channel.send ('the 8ball says that"' + ballMessage + '"will **not** come to pass'); break;
    }
}

if (answered == false) {
    userAnswer = msgs
    if (userAnswer == cAnswer) {
        message.reply ("got it right!");
    }
    else {
        message.reply ("got it wrong!");
    }
    answered = true; cAnswer = ""; userAnswer = "";
}

if (msg.startsWith(prefix + "quiz")) {
    number = 3;
    var random = Math.floor (Math.floor() * (number - 1 + 1)) + 1;
    switch (random) {
        case 1: message.channel.send ("who is the voice actor for Sponge Bob?"); cAnswer = "Tom Kenny";break;
        case 2: message.channel.send ("who created the Amulet Series?"); cAnswer = "Kazu Kibuishi"; break;
        case 3: message.channel.send ("who was the actor for Chewbacca?"); cAnswer = "Peter Mayhew"; break;
    }
    answered = false;
}




if (msg.startsWith(prefix + "profile")) {
    image = message.attachments.first().url;
    client.user.setAvatar (image);
}


if (msg.includes (prefix + "embed")) {
    embed = new discord.RichEmbed ()
      .setAuthor("Nick")
      .setDescription ("this is fake")
      .setFooter ("this is also fake")
      .addField ("hello", "😄😄😄")
      .setThumbnail ("https://cdn.discordapp.com/attachments/518030530814410762/593837072612065303/corgi.jpg")
      .setColor ("00ff00")


    message.channel.send (embed);
}


if (msg.startsWith (prefix + "crole") && message.member.hasPermission ("MANAGE_ROLES")) {
    messageSplit = message.content.split (" ", 3);
    roleName = messageSplit[1];
    roleColor = messageSplit[2].toUpperCase();
    addRolePerson = message.member;
    if (mention != null) { addRolePerson = message.guild.member(mention); }
    message.guild.createRole ( {
      name: roleName,
      color: roleColor,
      mentionable: true,
    }).then (role => addRolePerson.addRole(role));
    message.channel.send ("the role " + roleName + " has been added").then (d_msg => d_msg.delete (3000));
    message.delete(3000);
}


if (msg.startsWith (prefix + "randompics")) {
    nubmer = 3;
    imageNumber = Math.floor (Math.floor() * (number - 1 + 1)) + 1;
    message.channel.send ( {files: ["./images/" + imageNumber + ".png"]})
}


if (msg.startsWith (prefix + "love")) {
    message.react ('❤');
    const filter = (reaction) => reaction.emoji.name === '❤';
    message.awaitReactions(filter, {time: 3000})
      .then (collected => {
          message.channel.send (collected.size + " reactions collected");
      })
      .catch (console.erro);
}


});

client.login (process.env.BOT_TOKEN);
