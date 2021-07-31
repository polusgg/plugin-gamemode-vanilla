import { LobbyInstance } from "@nodepolus/framework/src/api/lobby";
import { PluginMetadata } from "@nodepolus/framework/src/api/plugin";
import { BaseMod } from "@polusgg/plugin-polusgg-api/src/baseMod/baseMod";
import { RoleAlignment } from "@polusgg/plugin-polusgg-api/src/baseRole/baseRole";
import { Crewmate } from "@polusgg/plugin-polusgg-api/src/baseRole/crewmate/crewmate";
import { Impostor } from "@polusgg/plugin-polusgg-api/src/baseRole/impostor/impostor";
import { Services } from "@polusgg/plugin-polusgg-api/src/services";
import { LobbyDefaultOptions } from "@polusgg/plugin-polusgg-api/src/services/gameOptions/gameOptionsService";
import { RoleAssignmentData } from "@polusgg/plugin-polusgg-api/src/services/roleManager/roleManagerService";
import { ServiceType } from "@polusgg/plugin-polusgg-api/src/types/enums";

const pluginMetadata: PluginMetadata = {
  name: "Vanilla",
  version: [1, 0, 0],
  authors: [
    {
      name: "Polus.gg",
      email: "contact@polus.gg",
      website: "https://polus.gg",
    },
  ],
  description: "NodePolus plugin generated from the template repository",
  website: "https://polus.gg",
};

export default class extends BaseMod {
  constructor() {
    super(pluginMetadata);
  }

  getRoles(lobby: LobbyInstance): RoleAssignmentData[] {
    const gameOptions = Services.get(ServiceType.GameOptions).getGameOptions<LobbyDefaultOptions>(lobby);

    return [
      {
        role: Crewmate,
        playerCount: lobby.getPlayers().length - gameOptions.getOption("Impostor Count").getValue().value,
        assignWith: RoleAlignment.Crewmate,
      },
      {
        role: Impostor,
        playerCount: gameOptions.getOption("Impostor Count").getValue().value,
        assignWith: RoleAlignment.Impostor,
      },
    ];
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async onEnable(_lobby: LobbyInstance): Promise<void> { }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async onDisable(_lobby: LobbyInstance): Promise<void> { }
}
