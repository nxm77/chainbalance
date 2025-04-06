import { setTelegramAlert } from "./alert";

export async function setTargetPosition(reqJson: string) {
    const strategyName = "DEFI_hedging";

    console.log("sending request to Scala trader: " + reqJson);
    const reqBase64 = btoa(reqJson);

    try
      {
        // ping t02.roc2.sg  -> telnet t02.roc2.sg 7890
        const response = await fetch(`http://t02.roc2.sg:7890/${strategyName}/setTargetPosition`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: reqBase64
        });
        const data = await response.json();
        setTelegramAlert("Target position sent. Response from Scala trader: " + data);

    // await $`${curlCmd}`;
      }
      catch(error) {
        if (error instanceof Error) {
          setTelegramAlert(`Send target position failed: ${error.message}`);
      } else {
          setTelegramAlert("An unknown error occurred.");
      }
      }
}
