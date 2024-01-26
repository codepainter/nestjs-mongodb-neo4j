import { ConfigModule } from '@nestjs/config';

export const validate = async () => {
  await ConfigModule.envVariablesLoaded;
};
