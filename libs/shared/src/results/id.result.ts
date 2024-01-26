import { ResultBase } from '@app/shared/results/result.base';

type IdResultProps = {
  id: string;
};

export class IdResult extends ResultBase<IdResultProps> {
  code = 'GENERIC.ID_SUCCESS';
  message = 'Id Success';

  constructor(props: IdResultProps) {
    super(props);
  }
}
