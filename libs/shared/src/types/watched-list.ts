export abstract class WatchedList<T> {
  public currentItems: T[];
  private initial: T[];
  private new: T[];
  private removed: T[];
  private updated: T[];

  constructor(initialItems?: T[]) {
    this.currentItems = initialItems ? initialItems : [];
    this.initial = initialItems ? Object.assign([], initialItems) : [];
    this.new = [];
    this.removed = [];
    this.updated = [];
  }

  abstract compareItems(a: T, b: T): boolean;

  public getItems(): T[] {
    return this.currentItems;
  }

  public getInitialItems(): T[] {
    return this.initial;
  }

  public getNewItems(): T[] {
    return this.new;
  }

  public getUpdatedItems(): T[] {
    return this.updated;
  }

  public getRemovedItems(): T[] {
    return this.removed;
  }

  private isCurrentItem(item: T): boolean {
    return (
      this.currentItems.filter((v: T) => this.compareItems(item, v)).length !==
      0
    );
  }

  private isUpdatedItem(item: T): boolean {
    return (
      this.updated.filter((v: T) => this.compareItems(item, v)).length !== 0
    );
  }

  private isNewItem(item: T): boolean {
    return this.new.filter((v: T) => this.compareItems(item, v)).length !== 0;
  }

  private isRemovedItem(item: T): boolean {
    return (
      this.removed.filter((v: T) => this.compareItems(item, v)).length !== 0
    );
  }

  private removeFromNew(item: T): void {
    this.new = this.new.filter((v) => !this.compareItems(v, item));
  }

  private removeFromUpdated(item: T): void {
    this.updated = this.updated.filter((v) => !this.compareItems(v, item));
  }

  private removeFromCurrent(item: T): void {
    this.currentItems = this.currentItems.filter(
      (v) => !this.compareItems(item, v),
    );
  }

  private removeFromRemoved(item: T): void {
    this.removed = this.removed.filter((v) => !this.compareItems(item, v));
  }

  private wasAddedInitially(item: T): boolean {
    return (
      this.initial.filter((v: T) => this.compareItems(item, v)).length !== 0
    );
  }

  public exists(item: T): boolean {
    return this.isCurrentItem(item);
  }

  public add(item: T): void {
    if (this.isRemovedItem(item)) {
      this.removeFromRemoved(item);
    }

    if (!this.isNewItem(item) && !this.wasAddedInitially(item)) {
      this.new.push(item);
    }

    if (!this.isCurrentItem(item)) {
      this.currentItems.push(item);
    }
  }

  public update(item: T): void {
    if (this.isNewItem(item)) {
      this.removeFromNew(item);
    }

    if (this.isRemovedItem(item)) {
      this.removeFromRemoved(item);
    }

    if (!this.isCurrentItem(item)) {
      this.currentItems.push(item);
    }

    if (!this.isUpdatedItem(item)) {
      this.updated.push(item);
    }
  }

  public remove(item: T): void {
    this.removeFromCurrent(item);

    if (this.isNewItem(item)) {
      this.removeFromNew(item);
      return;
    }

    if (!this.isRemovedItem(item)) {
      this.removed.push(item);
    }

    if (this.isUpdatedItem(item)) {
      this.removeFromUpdated(item);
    }
  }

  public asReadOnly(): ReadOnlyList<T> {
    return this;
  }
}

export interface ReadOnlyList<T> {
  getNewItems(): Readonly<T[]>;
  getItems(): Readonly<T[]>;
  getRemovedItems(): Readonly<T[]>;
}
