const {
    PermissionFlagsBits,
    SlashCommandBuilder,
    ChannelType,
    ChatInputCommandInteraction,
    EmbedBuilder,
  } = require("discord.js");
const leaveSchema = require("../../schemas/leaveSchema");
const joinSchema = require("../../schemas/joinSchema");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("events")
    .setDescription("Welcome command setup")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommand((subcommand) =>
        subcommand
          .setName("leave")
          .setDescription("Set or replace the leave message channel.")
          .addChannelOption((option) =>
            option
              .setName("channel")
              .setDescription("Channel to send the leave message to.")
              .addChannelTypes(ChannelType.GuildText)
              .setRequired(true)
          )
          .addBooleanOption((option) =>
            option
              .setName("enable")
              .setDescription("Enable leave messages")
              .setRequired(true)
          )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("welcome")
        .setDescription("Set or replace the welcome message channel.")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Channel to send the message to.")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
        .addBooleanOption((option) =>
          option
            .setName("enable")
            .setDescription("Enable welcome messages")
            .setRequired(true)
        )
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const sub = interaction.options.getSubcommand();

    switch (sub) {
      case "leave": {
          if (interaction.options.getSubcommand() === "leave") {
            const enableLeaveMsg = interaction.options.getBoolean("enable");
            const channel = interaction.options.getChannel("channel");
            const leaveSys = await leaveSchema.findOne({
              guildId: interaction.guild.id,
            });

            if (!leaveSys) {
              leaveChannel = await new leaveSchema({
                _id: mongoose.Types.ObjectId(),
                guildId: interaction.guild.id,
                channelId: channel.id,
                messageEnable: enableLeaveMsg,
              });

              await leaveChannel.save().catch((err) => console.log(err));
              const successEmbed = new EmbedBuilder()
                .setDescription(`Leave messages have now been enabled in **${channel.name}**!`)
                .setColor("Green")
              await interaction.reply({
                embeds: [successEmbed],
                ephemeral: true,
              });
            }
            if (leaveSys) {
              await leaveSchema.findOneAndUpdate(
                { guildId: interaction.guild.id },
                { channelId: channel.id }
              );
              const successEmbed = new EmbedBuilder()
                .setDescription(`Leave messages have been updated to **${channel.name}**!`)
                .setColor("Green")

              await interaction.reply({
                embeds: [successEmbed],
                ephemeral: true,
              });
            }
          }
        }
        break;
      case "welcome": {
          if (interaction.options.getSubcommand() === "welcome") {
            const enableWelcomeMsg = interaction.options.getBoolean("enable");
            const channel = interaction.options.getChannel("channel");
            const joinSys = await joinSchema.findOne({
              guildId: interaction.guild.id,
            });

            if (!joinSys) {
              joinChannel = await new joinSchema({
                _id: mongoose.Types.ObjectId(),
                guildId: interaction.guild.id,
                channelId: channel.id,
                messageEnable: enableWelcomeMsg,
              });

              await joinChannel.save().catch((err) => console.log(err));
              const successEmbed = new EmbedBuilder()
                .setDescription(`Welcome messages are now enabled in **${channel.name}**!`)
                .setColor("Green")
                .setTimestamp();
              await interaction.reply({
                embeds: [successEmbed],
                ephemeral: true,
              });
            }
            if (joinSys) {
              await joinSchema.findOneAndUpdate(
                { guildId: interaction.guild.id },
                { channelId: channel.id }
              );
              const successEmbed = new EmbedBuilder()
                .setDescription(`Welcome messages have been updated to **${channel.name}**!`)
                .setColor("Green")
                .setTimestamp();

              await interaction.reply({
                embeds: [successEmbed],
                ephemeral: true,
              });
            }
          }
        }
        break;
    }
  },
};
