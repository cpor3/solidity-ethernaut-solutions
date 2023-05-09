import { deployContracts } from "./deploy";

const test: boolean = false;

deployContracts(test).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});