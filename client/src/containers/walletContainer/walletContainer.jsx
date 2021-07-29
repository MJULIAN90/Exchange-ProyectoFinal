import CreateAccount from "methodsWallet/createAccount";
import Transaction from "components/transaction/transaction";
import TransactionsHistory from "methodsWallet/historyTransactions";
import { Deposit } from "components/deposit/deposit";
import BalanceAccount from "methodsWallet/balanceAccount";
import { Withdraw } from "components/withdraw/withdraw";
import { supabase } from "../../supabase/supabase";
import StellarSdk from "stellar-sdk";

import { Card, Tabs, Tab, Grid, AppBar } from "@material-ui/core";
import { useState, useEffect } from "react";
import useStyles from "styles";
import { getAssets } from "redux/actions/actions";
import ChangeTrust from "methodsWallet/trustLines";
import CreateClaimableBalance from "methodsWallet/createClaimableBalance.jsx";
import ClaimBalance from "methodsWallet/claimBalance";

export default function WalletContainer() {
  const [publicKey, setPublicKey] = useState();
  const [secretKey, setSecretKey] = useState();
  const [account, setAccount] = useState();
  const [assets, setAssets] = useState();
  const session = supabase.auth.session();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  const keys = async () => {

    const { data: assets } = await supabase.from("assets").select("*");
    setAssets(assets);

    const { data: public_key } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);
    const { data: secretKey } = await supabase
      .from("wallet")
      .select("secret_key")
      .eq("id_user", session.user.id);
    await setPublicKey(public_key[0]?.public_key);
    return setSecretKey(secretKey[0]?.secret_key);
  };

  if (publicKey && !account) {
    const account = server.loadAccount(publicKey).then(account => setAccount(account))
  }

  if (!publicKey) {
    keys();
  }

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={2} alignItems="flex-start">
        <AppBar position="static" style={{ height: "87vh" }}>
          <Tabs orientation="vertical" value={value} onChange={handleChange}>
            <Tab label="Get key" />
            <Tab label="Balance" />
            <Tab label="Transaction" />
            <Tab label="Transaction history" />
            <Tab label="Change trust" />
            <Tab label="Deposit" />
            <Tab label="Withdraw" />
            <Tab label="Create" />
            <Tab label="Claim" />
          </Tabs>
        </AppBar>
      </Grid>

      <Grid item xs={10}>
        <Card elevation={3} className={classes.cardContainer}>
          {value === 0 && <CreateAccount assets={assets} />}
          {value === 1 && <BalanceAccount assets={assets} />}
          {value === 2 && <Transaction />}
          {value === 3 && <TransactionsHistory publicKey={publicKey} />}
          {value === 4 && (
            <ChangeTrust
              publicKey={publicKey}
              secretKey={secretKey}
              assets={assets}
              account={account}
            />
          )}
          {value === 5 && <Deposit />}
          {value === 6 && <Withdraw />}
          {value === 7 && <CreateClaimableBalance publicKey={publicKey} secretKey={secretKey} assets={assets}/>}
          {value === 8 && <ClaimBalance publicKey={publicKey} secretKey={secretKey}/>}
        </Card>
      </Grid>
    </Grid>
  );
}
