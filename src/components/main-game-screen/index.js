import React, { Component } from 'react';
import {
  TouchableHighlight,
  Alert,
  Modal, View,
  Text,
  Dimensions,
} from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { LinearGradient } from 'expo';
import colors from '../colors';
import Dinosaur from '../../digi-dino';
import style from './styles';
import PetScreen from '../pet-screen';
import CareIcon from '../icon';

// import SvgExample from '../custom-icons/custom-icons';

const evening = [colors.darkblue, colors.blue, colors.darkgreen];
const day = [colors.blue, colors.lightblue, colors.midgreen];
const morning = [
  '#FF7897', '#FF947B', '#FFB566', '#FFD760', '#fedc77', '#fde08e', '#fce5a3', '#fae9b9',
  '#78C664', '#2FAB63', '#008E63',
];

const times = [morning, day, evening];

class MainGameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Dinosaur: new Dinosaur(props.navigation.getParam('name')),
      colors: morning,
      modalVisible: false,
    };

    const dayInterval = window.setInterval(() => {
      try {
        this.state.Dinosaur.dayPasses();
      } catch (error) {
        window.clearInterval(dayInterval);
        error.message;
        this.setState({
          modalVisible: true,
          errorMessage: error.message,
        });
      }
      this.setState({
        Dinosaur: this.state.Dinosaur,
        colors: times[(times.indexOf(this.state.colors) + 1) % times.length],
      });
    }, 1000);
  }


  handlePress(action) {
    try {
      this.state.Dinosaur[action]();
    } catch (error) {
      error.message;
      this.setState({ modalVisible: true });
    }
    this.setState({
      Dinosaur: this.state.Dinosaur,
    });
  }

  render() {
    const barWidth = (Dimensions.get('screen').width / 2) - 30;
    const progressCustomStyle = {
      backgroundColor: colors.white,
      borderRadius: 10,
      borderColor: colors.white,
    };
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={this.state.colors}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        />

        {/* Progress bar container1 starts */}
        <View style={style.container}>

          {/* Row 1 */}
          <View style={style.row}>
            <View style={style.column}>
              <Text style={style.actionLabel}>
                Fullness
              </Text>
              <ProgressBarAnimated
                {...progressCustomStyle}
                width={barWidth}
                value={this.state.Dinosaur.fullness}
              />
            </View>
            <View style={style.column}>
              <Text style={style.nameStyle}>
                {this.state.Dinosaur.name}
              </Text>
            </View>
          </View>

          {/* Row 2 */}
          <View style={style.row}>
            <View style={style.column}>
              <Text style={style.actionLabel}>
                Fitness
              </Text>
              <ProgressBarAnimated
                {...progressCustomStyle}
                width={barWidth}
                value={this.state.Dinosaur.fitness}
              />
            </View>
            <View style={style.column}>
              <Text style={style.actionLabel}>
                Energy
              </Text>
              <ProgressBarAnimated
                {...progressCustomStyle}
                width={barWidth}
                value={this.state.Dinosaur.energy}
              />
            </View>
          </View>

          {/* Row 3 */}
          <View style={style.row}>
            <View style={style.column}>
              <Text style={style.actionLabel}>
                Social
              </Text>
              <ProgressBarAnimated
                {...progressCustomStyle}
                width={barWidth}
                value={this.state.Dinosaur.social}
              />
            </View>
            <View style={style.column}>
              <Text style={style.actionLabel}>
                Cleanliness
              </Text>
              <ProgressBarAnimated
                {...progressCustomStyle}
                width={barWidth}
                value={this.state.Dinosaur.cleanliness}
              />
            </View>
          </View>
          {/* end of progress bars container 1 */}
        </View>

        {/* Dinosaur container2 starts */}
        <View style={style.container2}>
          <View style={style.petScreenContainer}>
            <PetScreen />
          </View>
        </View>
        {/* Dinosaur container2 ends */}

        {/* Icon container3 starts */}
        <View style={style.container3}>

          {/* Row 1 */}
          <View style={style.iconRow}>
            <CareIcon
              name="cutlery"
              type="font-awesome"
              onPress={() => this.handlePress('feed')}
            />
            <CareIcon
              name="soccer-ball-o"
              type="font-awesome"
              onPress={() => this.handlePress('play')}
            />
            <CareIcon
              name="bed"
              type="font-awesome"
              onPress={() => this.handlePress('bedTime')}
            />
          </View>

          {/* Row 2 */}
          <View style={style.iconRow}>
            <CareIcon
              name="chat"
              type="entypo"
              onPress={() => this.handlePress('socialise')}
            />
            <CareIcon
              name="emoticon-poop"
              type="material-community"
              onPress={() => this.handlePress('pooperScooper')}
            />
          </View>
          {/* Icon container3 ends */}
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={style.container4}>
            <View>
              <Text style={style.message1}>{this.state.errorMessage}</Text>
            </View>
            <TouchableHighlight
              onPress={() => {
                this.setState({ modalVisible: false });
                this.props.navigation.navigate('Home');
              }}
            >
              <View style={{ paddingTop: 50 }}>
                <Text style={style.message2}>
                  Start New Game
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}

export default MainGameScreen;
