export default interface CallBackFunc<T, U> {
  (input: T): U;
}
