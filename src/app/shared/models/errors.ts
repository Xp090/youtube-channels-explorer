/**
 * Base Error class which all errors will extend from
 * because it implements a workaround to allow extending native JS Error class
 */
export class BaseError extends Error {

  public __proto__: Error;

  constructor(message?: string) {
    const trueProto = new.target.prototype;
    super(message);
    this.__proto__ = trueProto;
  }
}

export class ChannelFailedToLoadError extends BaseError {
  constructor() {
    super("Failed to load channel's videos from Youtube");
  }
}

export class ChannelNotFoundError extends BaseError {
  constructor() {
    super("Channel not found");
  }
}



export class VideoFailedToLoadError extends BaseError {
  constructor() {
    super("Failed to load the video details from Youtube");
  }
}

export class VideoNotFoundError extends BaseError {
  constructor() {
    super("Video not found");
  }
}
