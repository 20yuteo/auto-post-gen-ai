export const handler = async (event: any) => {
  console.log("Hello, world from TypeScript!");
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello, world from TypeScript!" }),
  };
};
