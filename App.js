import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, ScrollView } from 'react-native';
import _ from "lodash";

import 'events';

const XMPP = require('@xmpp/client');
const debug = require("@xmpp/debug");


//var client = require('./xmpp.js/packages/client');
var base64 = require('base-64');
global.btoa = base64.encode;
global.atob = base64.decode;

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        output: ''
    }

    this.xmppClientListeners = [];
    //this.xmppClient = XMPP.xmpp().client;
    console.log('got here')
    console.log('XMPP object: ',XMPP)


    this.xmppClient = XMPP.client()

    this.XMPPServerOptions = {
    service: 'wss://chat.connectycube.com:7324',
    domain: 'chat.connectycube.com'}
    //Demo user credential VVV
    this.XMPPUserCredentials = {jidLocalPart: '11019238@chat.connectycube.com',
    password: 'pedroVanCuy'}
   

    
  }


 
  onStartConnect() {
    this.addListeners();
    //const XMPPFullOptions = this.XMPPUserCredentials.jidLocalPart + "@" + this.XMPPServerOptions.domain; //< should be server op 9 credentials 
    this.connect(this.XMPPServerOptions);
  }

  onSendMessage() {
    // he we send a message for the same user
    var stanzaParams = {
     from: this.XMPPUserCredentials.jidLocalPart + "@" + this.XMPPServerOptions.domain,
     to: this.XMPPUserCredentials.jidLocalPart + "@" + this.XMPPServerOptions.domain,
     type: 'chat',
     id: Math.floor(Math.random() * Math.floor(999999999))
    };
    var messageStanza = XMPP.xml("message", stanzaParams);

    messageStanza.c('body', {
      xmlns: 'jabber:client',
    }).t("Hello Amigo").up();

    this.xmppClient.send(messageStanza);
  }

  addListeners() {
    var self = this;
    console.log('got to the listener')
    var removeAllListeners = function(){
      console.log('inside listenerloop1')
        self.xmppClientListeners.forEach(function(listener){ //<<<< earlier I removed the list of listeners
          self.xmppClient.removeListener(listener.name, listener.callback);
        });
        self.xmppClientListeners = [];
        
    }

    removeAllListeners();

    const callbackConnect = function() {
        self.log('CONNECTING');
    };
    this.xmppClient.on('connect', callbackConnect);
    this.xmppClientListeners.push({name: 'connect', callback: callbackConnect});

    const callbackOnline = function(jid) {
        self.log('ONLINE');
    };
    this.xmppClient.on('online', callbackOnline);
    this.xmppClientListeners.push({name: 'online', callback: callbackOnline});

    const callbackStatus = function(status, value) {
        // self.log('status: ' + status);
    };
    this.xmppClient.on('status', callbackStatus);
    this.xmppClientListeners.push({name: 'status', callback: callbackStatus});

    // this.xmppClientReconnect.on('reconnecting', function() {
    //     Utils.DLog('[Chat]', 'RECONNECTING');
    // });
    //
    // this.xmppClientReconnect.on('reconnected', function() {
    //     Utils.DLog('[Chat]', 'RECONNECTED');
    // });

    const callbackStanza = function(stanza) {
        // console.log('stanza', stanza.toString())
        // after 'input' and 'element' (only if stanza, not nonza)

        if (stanza.is('presence')) {
          self.log("On PRESENCE: " + stanza);
        } else if (stanza.is('iq')) {
          self.log("On IQ: " + stanza);
        } else if(stanza.is('message')) {
          self.log("On MESSAGE: " + stanza);
        }
    };
    this.xmppClient.on('stanza', callbackStanza);
    this.xmppClientListeners.push({name: 'stanza', callback: callbackStanza});

    const callbackError = function(err) {
        self.log('ERROR:', err);
    };
    this.xmppClient.on('error', callbackError);
    this.xmppClientListeners.push({name: 'error', callback: callbackError});

    // this.xmppClient.on('element', function(element) {
    //     // console.log('element', element.toString())
    //     // after 'input'
    // });

    // this.xmppClient.on('send', function(element) {
    //     // console.log('send', element.toString())
    //     // after write to socket
    // });

    // this.xmppClient.on('outgoing', function(element) {
    //     // before send
    //     // console.log('outgoing', element.toString())
    // });

    const callbackOutput = function(str) {
        // self.log('SENT:', str);
    };
    this.xmppClient.on('output', callbackOutput);
    this.xmppClientListeners.push({name: 'output', callback: callbackOutput});

    const callbackInput = function(str) {
        // self.log('RECV:', str);
    };
    this.xmppClient.on('input', callbackInput);
    this.xmppClientListeners.push({name: 'input', callback: callbackInput});
    
    //***************DELETE THIS BLOCK SOON */
    // const callbackAuthenticate = function(authenticate) {
    //   self.log('AUTHENTICATING');

    //   return authenticate(self.XMPPUserCredentials.jidLocalPart,
    //     self.XMPPUserCredentials.password)
    // };
    // console.log(this.xmppClient)
    // this.xmppClient.handle('authenticate', callbackAuthenticate);
    // this.xmppClientListeners.push({name: 'authenticate', callback: callbackAuthenticate});
  }

  connect(options){
    options.resource = this.XMPPUserCredentials.jidLocalPart;
    options.username = this.XMPPUserCredentials.jidLocalPart.split('@')[0]; // assuming jidLocalPart contains the full JID
    options.password = this.XMPPUserCredentials.password;
    this.xmppClient.start(options).catch(console.error);
    this.xmppClient.on("online", (address) =>{
      console.log("online", address.toString());
    } )
  }

  log(text){
    console.log(text);

    this.setState({output: this.state.output + "\n" + text})
  }

  render() {

    var buttons = (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={this.onStartConnect.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>
              Connect to XMPP server (login)
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.onSendMessage.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>
              Send a message
          </Text>
        </TouchableHighlight>
      </View>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.output_result}>
            {this.state.output}
        </Text>
        {buttons}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  output_result: {
    color: '#000',
    marginTop: 20,
 },
});
