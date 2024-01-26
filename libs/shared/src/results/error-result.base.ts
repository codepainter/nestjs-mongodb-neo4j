export type ErrorResultProps = {
  code: string | number;
  message: string;
  error?: Error | string;
  metadata?: object;
};

export class ErrorResult {
  readonly code: number | string;

  readonly message: string;

  readonly error?: object | string;

  readonly metadata?: object;

  constructor(props: ErrorResultProps) {
    this.code = props.code;
    this.message = props.message;
    this.error = props.error;
    this.metadata = props.metadata;
  }
}
