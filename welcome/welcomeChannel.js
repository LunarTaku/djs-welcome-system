const {
  PermissionFlagsBits,
  SlashCommandBuilder,
  ChannelType,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const joinSchema = require("../../schemas/joinSchema");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("welcome")
    .setDescription("configure welcome messages")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("setup")
        .setDescription("Set, or replace welcome the welcome message channel.")
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
          .setDescription("enable welcome messages")
          .setRequired(true)
      )
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {

    if (interaction.options.getSubcommand() === "setup") {
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
          .setDescription(
            `<:yes:1008052758366142464> Welcome messages are now enabled in ${channel.name}!`
          )
          .setColor("#00ff00")
          .setTimestamp();
        await interaction.reply({ embeds: [successEmbed] });
      }
      if (joinSys) {
        await joinSchema.findOneAndUpdate(
          { guildId: interaction.guild.id },
          { channelId: channel.id }
        );
        const successEmbed = new EmbedBuilder()
          .setDescription(
            `<:yes:1008052758366142464> Welcome messages have been updated to ${channel.name}!`
          )
          .setColor("#00ff00")
          .setTimestamp();

        await interaction.reply({ embeds: [successEmbed] });
      }
    }
  },
};
