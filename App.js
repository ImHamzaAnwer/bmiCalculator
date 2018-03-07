import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const BMI_DATA = [
  {
    type: "Very Severly Underweight",
    values: '< 16.0',
    indicationColor: "#9d9d9c",
  },
  {
    type: "Severly Underweight",
    values: '16.0 - 16.9',
    indicationColor: "#9d9d9c",
  },
  {
    type: "Underweight",
    values: '17.0 - 18.4',
    indicationColor: "#9d9d9c",
  },
  {
    type: "Normal",
    values: '18.5 - 24.9',
    indicationColor: "green",
  },
  {
    type: "Overweight",
    values: '25.0 - 29.9',
    indicationColor: "yellow",
  },
  {
    type: "Obese Class I",
    values: '30.0 - 34.9',
    indicationColor: "red",
  },
  {
    type: "Obese Class II",
    values: '35.0 - 39.9',
    indicationColor: "red",
  },
  {
    type: "Obese Class III",
    values: '> 39.9',
    indicationColor: "red",
  },
]


export default class App extends Component {

  state = {
    height: 0,
    weight: 0,
    result: 0,
    type: '',
    barFill: '#b0c4de',
    fillQuantity: 0,
  };

  containerTouched = (e) => {
    this.refs.height.blur();
    this.refs.weight.blur();
    return false;
  }

  calcBmi = (e) => {
    const { height, weight, result } = this.state;
    const h = height.trim() / 100;

    let bmi = Number((weight / (h * h)).toFixed(1));

    this.setState({ result: bmi });

    if (result < 16.0) {
      this.setState({ type: 'Very Severly Underweight', barFill: "#9d9d9c", fillQuantity: 25 })
    }
    else if (result >= 16.0 && result < 17.0) {
      this.setState({ type: 'Severly Underweight', barFill: "#9d9d9c", fillQuantity: 25 })
    }
    else if (result > 16.9 && result < 18.5) {
      this.setState({ type: 'Underweight', barFill: "#9d9d9c", fillQuantity: 25 })
    }
    else if (result > 18.4 && result < 25.0) {
      this.setState({ type: 'Normal', barFill: "green", fillQuantity: 50 })
    }
    else if (result > 24.9 && result < 30.0) {
      this.setState({ type: 'Overweight', barFill: "yellow", fillQuantity: 75 })
    }
    else if (result > 29.9 && result < 35.0) {
      this.setState({ type: 'Obese Class I', barFill: "red", fillQuantity: 85 })
    }
    else if (result > 34.9 && result < 40.0) {
      this.setState({ type: 'Obese Class II', barFill: "red", fillQuantity: 90 })
    }
    else {
      this.setState({ type: "Obese Class III", barFill: "red", fillQuantity: 100 })
    }

  }

  render() {
    return (
      <ScrollView onStartShouldSetResponder={this.containerTouched} style={styles.rootContainer} >
        <View style={{ paddingVertical: 20 }}>

          <Text style={styles.title}>BMI Calculator</Text>

          <View style={styles.inputContainer}>

            <Text style={styles.textLabel}>Height (cm):</Text>

            <TextInput
              underlineColorAndroid="#fff"
              style={styles.textInput}
              keyboardType="numeric"
              onChangeText={(height) => this.setState({ height })}
              value={this.state.height}
              ref="height"
            />
          </View>


          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>Weight (kg):</Text>
            <TextInput
              underlineColorAndroid="#fff"
              style={styles.textInput}
              keyboardType="numeric"
              onChangeText={(weight) => this.setState({ weight })}
              value={this.state.weight}
              ref="weight"
            />
          </View>

          <TouchableOpacity
            disabled={this.state.height > 0 ? false : true}
            style={styles.calcButton}
            onPress={this.calcBmi}
          >
            <Text style={styles.btnText}> Press to calculate</Text>
          </TouchableOpacity>


          <AnimatedGaugeProgress
            style={{ alignSelf: "center" }}
            size={200}
            width={15}
            fill={this.state.fillQuantity}
            rotation={90}
            cropDegree={200}
            tintColor={this.state.barFill}
            backgroundColor="#fff"
            stroke={[2, 2]} //For a equaly dashed line
            strokeCap="circle">

            {(fill) => (
              <View style={styles.textView}>
                <Text style={[styles.resultText, { color: this.state.barFill }]}>{this.state.result}</Text>
                <Text style={[styles.resultText, { fontSize: 13 }]}>{this.state.type}</Text>
              </View>
            )}
          </AnimatedGaugeProgress>

          {
            BMI_DATA.map((val, idx) => {
              return (
                <View style={styles.row} key={idx}>
                  <Text style={{ color: "#fff" }} > {val.type}</Text>
                  <Text style={{ color: "#fff" }} >{val.values}</Text>
                </View>
              )
            })
          }

        </View>
      </ScrollView>
    );
  }
}

const size = 200;
const width = 15;
const cropDegree = 90;
const textOffset = width;
const textWidth = size - (textOffset * 2);
const textHeight = size * (1 - cropDegree / 360) - (textOffset * 2);

const styles = {
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginVertical: 3
  },
  textView: {
    position: 'absolute',
    top: textOffset,
    left: textOffset,
    width: textWidth,
    height: textHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
  rootContainer: {
    flex: 1,
    backgroundColor: '#003F91'
  },
  inputContainer: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: "#EAEAEA",
    fontWeight: 'bold'
  },
  textLabel: {
    fontSize: 18,
    color: "#fff"
  },
  textResult: {
    fontSize: 20,
    color: "#fff"
  },
  calcButton: {
    marginTop: 20,
    marginBottom: 50,
    backgroundColor: "dodgerblue",
    padding: 10,
    borderRadius: 3,
    alignSelf: "center"
  },
  btnText: {
    color: "#fff"
  },
  textInput: {
    color: "#fff",
    padding: 5,
    height: 35,
    width: 140,
    borderRadius: 5,
    marginBottom: 30,
    textAlign: "center"
  },
  resultText: {
    fontSize: 22,
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: "#fff",
    textAlign: "center"
  }
};