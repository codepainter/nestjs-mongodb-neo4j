export abstract class MessageBase<TMessage> {
  readonly props: TMessage;

  constructor(props: TMessage) {
    this.props = props;
  }
}
