<template>
  <div class="padded-element">
    <h2><a id="What_is_CryptoWeddings_0"></a>What is CryptoWeddings?</h2>
    <p>
      CryptoWeddings is a Dapp (Decentralized Application) which uses the
      ethereum blockchain. It takes two addresses and creates a wedding smart
      contract (decentralized program on the ethereum blockchain). On this
      wedding smart contract, the two addresses can agree to marry (or not).
      This is set on the blockchain and cannot be changed by anyone other than
      the two parties who agreed to marry (divorces are possible). Spectators
      can watch live and send wedding gifts along with messages that will stay
      on the blockchain.
    </p>
    <h2><a id="Why_is_this_cool_3"></a>Why is this cool?</h2>
    <ul>
      <li>
        your wedding will live forever on the blockchain which is pretty neat :)
      </li>
      <li>
        couples who live in countries with governments that have rather
        opressive policies on non traditional relationships can marry on the
        blockchain and no one else can remove/delete it (the ethereum blockchain
        is immutable)
      </li>
    </ul>
    <h2>
      <a id="Does_this_mean_anything_in_real_life_7"></a>Does this mean anything
      in real life?
    </h2>
    <p>At the moment no. In the future? Who knows?</p>

    <v-divider class="mt-4 mb-4" />

    <p class="display-2">Specific Guides</p>
    <v-expansion-panel v-model="panel" popout>
      <v-expansion-panel-content>
        <div slot="header">How Does it Work?</div>
        <v-card>
          <v-card-text>
            <p>
              CryptoWeddings works by connecting this website to the ethereum
              blockchain. This website comes integrated with a wallet for you to
              use. The wallet represents your identity in this case. In order to
              do anything other than view weddings, you will need to buy ether
              (the native currency of the ethereum blockchain) and send it to
              your wallet. Once when you have some ether in your wallet, you can
              create a wedding or participate in a wedding. Gifts can also be
              sent by other users as well. The steps needed in order to use this
              site are described in each of the sections below.
            </p>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header">Creating an Account</div>
        <v-card>
          <v-card-text>
            <p>
              This site uses ethereum accounts in two different ways, through
              the integrated wallet, and through MetaMask.
            </p>
            <h3><a id="Funding_your_account_16"></a>Funding your account</h3>
            <p>
              Ethereum transactions need gas. This is a transaction fee that is
              paid to the ethereum network (not this site). This means that you
              need to have ether (the native Ethereum currency) in order to do
              anything other than simply view weddings. Buying ethereum is
              probably the most challenging part of using this site. You will
              need to buy from an exchange or find some other means.
            </p>
            <p>
              Once when you have bought ether, you can send a small amount to
              the wallet that you intend to use with this site. That wallet is
              either the integrated wallet or MetaMask. For MetaMask, find the
              address in the plugin. For the integrated wallet, click wallet in
              the menu on this site and then go to the funding tab. You will
              find and address there. Copy it and send the ether to that
              address. You should not need more than 0.1 ether in order to do
              most things here.
              <strong
                >Do not use this site�s wallet as a safe place to store
                funds</strong
              >.
            </p>
            <h3>
              <a id="Using_the_integrated_wallet_21"></a>Using the integrated
              wallet
            </h3>
            <p>
              The integrated wallet works by storing a 12 word mnemonic which is
              encrypted by a password that you choose. As with most other
              cryptocurrency wallets,
              <strong
                >you must write down / store this mnemonic somewhere
                safe</strong
              >! The mnemonic is stored encrypted in the browser. You can also
              use your own mnemonic (perhaps from another wallet). If you do not
              know what you are doing you should not use a custom mnemonic.
              Simply use the mnemonic given by this site.
            </p>
            <p>
              If you delete the browser storage (local storage for those
              technically inclined), you can restore your wallet using the
              mnemonic.
            </p>
            <p>
              The integrated wallet has very limited functionality since it is
              meant to simply be used with the CryptoWeddings Dapp. However,
              once finished with a wedding, leftover ether can be swept out to
              an account of your choice for safer storage.
            </p>
            <h3><a id="Using_MetaMask_28"></a>Using MetaMask</h3>
            <p>
              You can use MetaMask instead of the integrated wallet. You can
              find a switch to turn this on in the settings page. If you are
              using MetaMask, the network and address will be determined by
              MetaMask. Additionaly, this means that you can use hardware
              wallets with MetaMask and therfore with this site.
            </p>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header">Spectating a Wedding</div>
        <v-card>
          <v-card-text>
            <p>
              You do not need any ether or an account to watch a wedding. You
              can find most recent weddings on the home page. If you are looking
              for a specific wedding, ask for the link from one of the fiances.
            </p>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header">Sending Wedding Gifts</div>
        <v-card>
          <v-card-text>
            <p>
              As a spectator, you can send wedding gifts in the form of ether.
              When sending a wedding gift, you can leave a message as well which
              will show to the other users. The wedding owners can hide messages
              from specific users or hide all messages at their own discretion.
              Additionally in order to prevent spam, a minimum gift amount is
              set by default. The default minimum is .01 ether. The wedding
              owners can raise or lower this at their discretion.
            </p>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header">Creating a Wedding</div>
        <v-card>
          <v-card-text>
            <p>
              In order to create a wedding, you need an accoung with ether.
              Please see the <strong>Creating an Account</strong> section if you
              do not have an accoutn ready.
            </p>
            <p>
              Creating a wedding once when you have a funded account is quite
              simple. Simply go to the <em>Get Married</em> page and give the
              name for yourself, your partner, and your partner's address (your
              address is automatically filled in). Once filled submit the form
              and you will be prompted for a confirmation. After this, your
              wedding will be created on the ethereum blockchain using your
              account and your funds. At the top right you will see a loading
              spinner until the transaction is complete. You can see the
              transaction status on etherescan by clicking the link. You will be
              taken to your wedding page and notified once it is ready. You
              still need to say "I do" or "I don't". See the
              <strong>Accepting a wedding</strong> section for more information.
            </p>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header">Accepting a Wedding</div>
        <v-card>
          <v-card-text>
            <p>
              If you have an account and a wedding has been created involving
              the address that you are using, it will show as a link in the
              menu. Simply click on <em>Your Wedding</em> in the menu, this will
              take you to your wedding page where you can either say "I do" or
              "I don't". This can be done quite literaly with voice if you are
              using chrome. Otherwise you can press the button reflecting your
              choice. If you say I don't, the wedding smart contract will be
              destroyed. If both you and the wedding creator say "I do", then
              you and the other address become married on the blockchain. As
              stated before, your account must have ether on it in order to pay
              for the Ethereum transaction fees.
            </p>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header">Sharing a Wedding</div>
        <v-card>
          <v-card-text>
            <p>
              Anyone else can see your wedding live as it happens! Just go to
              <em>Your Wedding</em> from the menu and copy the link it takes you
              to.
            </p>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header">After the Wedding</div>
        <v-card>
          <v-card-text>
            <p>
              After you and your partner have married, you can claim wedding
              gifts and set a wedding photo. Both of these actions follow the
              same pattern as getting married in the earlier sections. Go yo
              <em>Your Wedding</em> from the menu to find the functionality. As
              before, you need ether in order to do anything.
            </p>
            <p>
              Either partner can withdraw the full amount of wedding gifts
              (ether). Make sure you trust the person you are marrying :)
            </p>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header">Withdrawing Leftover Funds</div>
        <v-card>
          <v-card-text>
            <p>
              If you are using the integrated wallet, you can withdraw leftover
              funds by going to the <em>Funding</em> tab on the wallet page.
              Give a valid address for where to the withdraw the funds to, and
              click the <em>sweep funds</em> button.
            </p>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header">Adjusting your Wedding Experience</div>
        <v-card>
          <v-card-text>
            <p>
              If you are using this live in front of others, you will probably
              want to make sure that things work smoothly and as quickly as
              possible. This site has options on the <em>Settings</em> page
              which can be found from the menu.
            </p>
            <h3><a id="Gas_price_59"></a>Gas price</h3>
            <p>
              Set a higher gas price in order to make sure that transactions go
              through quickly. 20 gwei would be considered quite high and fast
              at most times. Set what you want and use your own judgement.
            </p>
            <h3><a id="Skip_confirmations_62"></a>Skip confirmations</h3>
            <p>
              The confirmation dialog can be skipped altogether in order to make
              the process more seamless.
            </p>
            <h3><a id="Network_65"></a>Network</h3>
            <p>
              If you want to do a recital or simply get to know the site better
              before using, you can use a test network instead of the real
              ethereum blockchain. You will need to get ether for the relevant
              test network.
            </p>
            <h3><a id="Banning_users_68"></a>Banning users</h3>
            <p>
              You can ban specific addresses if offensive or undesired messages
              are left. The message will be replaced with �best wishes!�. This
              can be undone at any time. Banning users requires an account with
              ether on it. It can be found under the wedding tab of the settings
              page.
            </p>
            <h3>
              <a id="Hiding_wedding_gift_messages_71"></a>Hiding wedding gift
              messages
            </h3>
            <p>
              If Banning users becomes too much work, or you do not want to deal
              with the problem at all, you can disable wedding gifts altogether.
              Gifts will still be sent, but they will not show on the site. This
              operation also requires an account with ether on it. It can be
              found under the wedding tab of the settings page.
            </p>
            <h3>
              <a id="Adjusting_wedding_minimum_wedding_gift_amount_74"></a
              >Adjusting wedding minimum wedding gift amount
            </h3>
            <p>
              Adjusting the minimum amount can be an effective way to get the
              behavior you want from users. If spammers are sending offensive
              messages, setting the minimum gift higher may prevent them from
              continuing. Though setting it too high might prevent actual
              friends from sending a message when they otherwise would have.
              Adjust according to your own judgement. This operation also
              requires an account with ether. It can be found under the wedding
              tab of the settings page.
            </p>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header">Divorcing</div>
        <v-card>
          <v-card-text>
            <p>
              If you really need to divorce, there is a very subtle broken heart
              icon on <em>Your Wedding</em> page. Click it to start a divorce.
              Both parties must agree to divorce just as in real life. Divorcing
              requires an account with ether.
            </p>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      panel: null
    }
  }
}
</script>
