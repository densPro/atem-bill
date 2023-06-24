
export const clearBill = (args: any[]) => {
  args.forEach(arg => {
    arg('');
  });
}