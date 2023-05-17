export function fakeAsync(callback: VoidFunction) {
  setTimeout(callback, 1000);
}