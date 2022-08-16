const chalk = require("chalk");
const {
  Client,
  CommandInteraction,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Attachment,
  GuildMember,
} = require("discord.js");
const { default: mongoose } = require("mongoose");
const joinSchema = require("../../schemas/joinSchema");

module.exports = {
  name: "guildMemberAdd",

  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const { user } = interaction;
    const joinChannel = await joinSchema.findOne({
      guildId: interaction.guild.id,
    });

    if(joinChannel.messageEnable === true) {

      if(!joinChannel.channelId) {
        await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor("Red")
              .setDescription('<:no:1008052759997718608> You have not set a welcome message channel yet!')
              .addFields({
                name: "How to setup a welcome channel:",
                value: "1️⃣ > Do \`/welcome channel enable\`\n2️⃣ > Do \`/welcome channel set <channel>\`"
              })
          ]
        })
      }

      client.channels.cache.get(joinChannel.channelId).send({
        embeds: [
          new EmbedBuilder()
            .setTitle(`New Member Join!`)
            .setDescription(`Welcome <@${user.id}> to ${interaction.guild.name}! We hope you enjoy your stay!`)
            .addFields(
              {
                name: "Account Created",
                value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`,
                inline: true,
              },
              {
                name: "Member Count",
                value: `${interaction.guild.memberCount} members`,
                inline: true,
              }
            )
            .setColor("#00ff00")
            
            .setTimestamp()
        ],
      }).catch((err) => {
        console.log(err);
      });
    }
  },
};
