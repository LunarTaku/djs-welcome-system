const {
    Client,
    ChatInputCommandInteraction,
    EmbedBuilder,
  } = require("discord.js");
  const { default: mongoose } = require("mongoose");
  const leaveSchema = require("../../schemas/leaveSchema");
  
  module.exports = {
    name: "guildMemberRemove",
  
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
      const { user } = interaction;
      const leaveChannel = await leaveSchema.findOne({
        guildId: interaction.guild.id,
      });
  
      if (leaveChannel.messageEnable === true) {
        if (!leaveChannel.channelId) {
          await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor("Red")
                .setDescription(`You have not set a leave message channel yet!`),
            ],
          });
        }
  
        client.channels.cache
          .get(leaveChannel.channelId)
          .send({
            embeds: [
              new EmbedBuilder()
                .setTitle(`New Member Left`)
                .setDescription(
                  `<@${user.id}> Left the server. We will miss you, we hope we see you again.`
                )
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
                .setColor("Red")
  
                .setTimestamp(),
            ],
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  };
