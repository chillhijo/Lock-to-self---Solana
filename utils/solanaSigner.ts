import { execSync } from "child_process";

export function signAndSendTx(base64Tx: string): string {
  const txFile = "/tmp/tx.txt";

  // Save the unsigned tx to a temp file
  require("fs").writeFileSync(txFile, base64Tx, "utf8");

  // solana CLI signs + sends
  const output = execSync(
    `solana transfer --from ${process.env.CLI_KEYPAIR_PATH} --fee-payer ${process.env.CLI_KEYPAIR_PATH} --with-compute-unit-price 1 --allow-unfunded-recipient --sign-only ${txFile}`,
    { encoding: "utf8" }
  );

  console.log("Signed TX:", output);
  return output;
}
