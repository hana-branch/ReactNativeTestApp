import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Button from './Button'
import branch, { RegisterViewEvent, BranchEvent } from 'react-native-branch'

// const defaultBUO = {
//   title: 'wallo'
// }

class BranchMethods extends Component {

  buo = null

  state = {
    results: [],
  }

  componentWillUnmount() {
    if (!this.buo) return
    this.buo.release()
  }

  createBranchUniversalObject = async () => {
    try {
      let result = await branch.createBranchUniversalObject('abc')
      if (this.buo) this.buo.release()
      this.buo = result
      console.log('createBranchUniversalObject', result)
      this.addResult('success', 'createBranchUniversalObject', result)
    } catch (err) {
      console.log('createBranchUniversalObject err', err.toString())
      this.addResult('error', 'createBranchUniversalObject', err.toString())
    }
  }

  generateShortUrl = async () => {
    // if (!this.buo) await this.createBranchUniversalObject()
    const referralCode = "test"
    const branchUniversalObject = await branch.createBranchUniversalObject('referrals', {
      contentMetadata: { customMetadata: { referralCode } },
    });

    let linkProperties = {
      feature: 'sharing',
      channel: 'facebook',
      campaign: 'content 123 launch'  
    }

    let controlParams = {
      $desktop_url: 'https://app.jrft-dev.com/collection-invite/3d09f93f-21d0-4152-8866-21529b92a3f0',
      $fallback_url: 'https://app.jrft-dev.com/collection-invite/3d09f93f-21d0-4152-8866-21529b92a3f0',
      $fallback_url: 'https://app.jrft-dev.com/collection-invite/3d09f93f-21d0-4152-8866-21529b92a3f0',
      custom: 'data'   
    }

    try {
      let result = await branchUniversalObject.generateShortUrl(linkProperties,controlParams)
      console.log('generateShortUrl', result)
      this.addResult('success', 'generateShortUrl', result)
    } catch (err) {
      console.log('generateShortUrl err', err)
      this.addResult('error', 'generateShortUrl', err.toString())
    }
  }

  listOnSpotlight = async () => {
    if (!this.buo) await this.createBranchUniversalObject()
    try {
      let result = await this.buo.listOnSpotlight()
      console.log('listOnSpotlight', result)
      this.addResult('success', 'listOnSpotlight', result)
    } catch (err) {
      console.log('listOnSpotlight err', err.toString())
      this.addResult('error', 'listOnSpotlight', err.toString())
    }
  }

  showShareSheet = async () => {
    if (!this.buo) await this.createBranchUniversalObject()
    try {
      let result = await this.buo.showShareSheet()
      console.log('showShareSheet', result)
      this.addResult('success', 'showShareSheet', result)
    } catch (err) {
      console.log('showShareSheet err', err.toString())
      this.addResult('error', 'showShareSheet', err.toString())
    }
  }

  userCompletedAction = async() => {
    if (!this.buo) await this.createBranchUniversalObject()
    try {
      let result = await this.buo.userCompletedAction(RegisterViewEvent)
      console.log('userCompletedAction', result)
      this.addResult('success', 'userCompletedAction', result)
    } catch (err) {
      console.log('userCompletedAction err', err.toString())
      this.addResult('error', 'userCompletedAction', err.toString())
    }
  }

  sendCommerceEvent = async() => {
    try {
      let result = await branch.sendCommerceEvent(20.00, {"key": "value"})

      console.log('sendCommerceEvent', result)
      this.addResult('success', 'sendCommerceEvent', result)
    } catch (err) {
      console.log('sendCommerceEvent err', err.toString())
      this.addResult('error', 'sendCommerceEvent', err.toString())
    }
  }

  disableTracking = async () => {
    try {
      let disabled = await branch.isTrackingDisabled()
      branch.disableTracking(!disabled)
      disabled = await branch.isTrackingDisabled()
      let status = disabled ? 'Tracking Disabled' : 'Tracking Enabled'
      console.log('disableTracking', status)
      this.addResult('success', 'disableTracking', status)
    } catch (err) {
      console.log('disableTracking err', err)
      this.addResult('error', 'disableTracking', err.toString())
    }
  }

  isTrackingDisabled = async () => {
    try {
      let disabled = await branch.isTrackingDisabled()
      let status = disabled ? 'Tracking is Disabled' : 'Tracking is Enabled'
      console.log('isTrackingDisabled', status)
      this.addResult('success', 'isTrackingDisabled', status)
    } catch (err) {
      console.log('isTrackingDisabled err', err)
      this.addResult('error', 'isTrackingDisabled', err.toString())
    }
  }

  logStandardEvent = async () => {
    if (!this.buo) await this.createBranchUniversalObject()
    try {
      let branchEvent = new BranchEvent(
        BranchEvent.Purchase,
        [],
        {
          transactionID: '12344555',
          currency: 'USD',
          revenue: 1.5,
          shipping: 10.2,
          tax: 12.3,
          coupon: 'test_coupon',
          affiliation: 'test_affiliation',
          description: 'Test purchase event',
          searchQuery: 'test keyword',
          customData: {
            "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
            "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
          },
          alias: 'ItemViewed'
        }
      )
      branchEvent.logEvent()

      this.addResult('success', 'sendStandardEvent', branchEvent)
    } catch (err) {
      console.log('sendStandardEvent err', err)
      this.addResult('error', 'sendStandardEvent', err.toString())
    }
  }

  logCustomEvent = async () => {
    // if (!this.buo) await this.createBranchUniversalObject()

    let buo = await branch.createBranchUniversalObject(
        "Clovia",
        {
            canonicalUrl: "www.clovia.com",
            title: "View Product",
            contentMetadata: {
                productBrand: "CLOVIA",
                productCategory: "Animals & Pet Supplies",
                customMetadata: {
                    "Price": "$12",
                    "Product name": "Test"
                }
            }
        }
    )

    let params = {
      transactionID: '12344555',
      currency: 'USD',
      revenue: 1.5,
      shipping: 10.2,
      tax: 12.3,
      coupon: 'test_coupon',
      affiliation: 'test_affiliation',
      description: 'Test purchase event',
      searchQuery: 'test keyword',
      customData: {
        "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
        "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
      }
    };
    try {
      let branchEvent = new BranchEvent(
        'Test Custom Event Name',
        [],
        params
      )
      branchEvent.logEvent()

      this.addResult('success', 'sendCustomEvent', branchEvent)
    } catch (err) {
      console.log('sendCustomEvent err', err)
      this.addResult('error', 'sendCustomEvent', err.toString())
    }
  }

  openURL = async () => {
    const url = 'https://hanadev1.test-app.link/hiBZn9zJPtb';
    try {
      await branch.openURL(url);
      this.addResult('success', 'openURL', url);
    }
    catch (err) {
      this.addResult('error', 'openURL', err.toString());
    }
  }

  lastAttributedTouchData = async() => {
    const attributionWindow = 365
    try {
      let latd = await branch.lastAttributedTouchData(attributionWindow)
      console.log('lastAttributedTouchData', latd)
      this.addResult('success', 'lastAttributedTouchData', latd)
    } catch (err) {
      console.log('lastAttributedTouchData', err)
      this.addResult('error', 'lastAttributedTouchData', err.toString())
    }
  }

  addResult(type, slug, payload) {
    let result = { type, slug, payload }
    this.setState({
      results: [result, ...this.state.results].slice(0, 10)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.resultsContainer}>
          <Text style={styles.header}>RESULTS</Text>
          <ScrollView style={styles.scrollContainer}>
            {this.state.results.length === 0 && <Text>No Results yet, run a method below</Text>}
            {this.state.results.map((result, i) => {
              return (
                <View key={i} style={styles.result}>
                  <Text style={result.type === 'success' ? styles.textSucccess : styles.textError}>{`${result.slug} (${result.type})`}</Text>
                  <Text style={styles.textSmall}>{JSON.stringify(result.payload, null, 2)}</Text>
                </View>
              )
            })}
          </ScrollView>
        </View>
        <Text style={styles.header}>METHODS</Text>
        <ScrollView style={styles.buttonsContainer}>
          <Button onPress={this.disableTracking}>disableTracking (switch on/off)</Button>
          <Button onPress={this.isTrackingDisabled}>isTrackingDisabled</Button>
          <Button onPress={this.createBranchUniversalObject}>createBranchUniversalObject</Button>
          <Button onPress={this.userCompletedAction}>userCompletedAction</Button>
          <Button onPress={this.sendCommerceEvent}>sendCommerceEvent</Button>
          <Button onPress={this.generateShortUrl}>generateShortUrl</Button>
          <Button onPress={this.listOnSpotlight}>listOnSpotlight</Button>
          <Button onPress={this.showShareSheet}>showShareSheet</Button>
          <Button onPress={this.logStandardEvent}>BranchEvent.logEvent (Standard)</Button>
          <Button onPress={this.logCustomEvent}>BranchEvent.logEvent (Custom)</Button>
          <Button onPress={this.openURL}>openURL</Button>
          <Button onPress={this.lastAttributedTouchData}>lastAttributedTouchData</Button>
        </ScrollView>
      </View>
    )
  }
}

export default BranchMethods

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
  },
  header: {
    backgroundColor: '#ccc',
    padding: 5,
    paddingLeft: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#aaa',
    fontSize: 10,
    fontWeight: 'bold',
  },
  resultsContainer: {
    height: 200,
  },
  scrollContainer: {
    padding: 5,
  },
  result: {
    padding: 5,
  },
  textSmall: {
    fontSize: 10,
  },
  textSucccess: {
    color: '#6c9c5d',
  },
  textError: {
    color: '#a03d31',
  },
  buttonsContainer: {
    flex: 1,
  }
})
