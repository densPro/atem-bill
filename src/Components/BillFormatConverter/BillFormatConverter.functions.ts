// export const insertBill = () => {
//   console.log('')
// }

export const clearBill = (args: any[]) => {
  args.forEach(arg => {
    arg('');
  });
}