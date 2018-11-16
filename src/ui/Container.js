import React, { Component } from 'react';
import { Button, Popover, PopoverBody, Input } from 'reactstrap'
import cx from 'classnames'
import Constants from '../Constants'
import API from './api'
// import backgroundImg from '../img/bg.jpg'
import './Container.css';

import { IoIosMusicalNotes, IoMdVolumeOff } from 'react-icons/io'

import TreeCanvas from './TreeCanvas'

import BridegroomSvg from '../img/bride_groom'
import GotMarriedSvg from '../img/got_married'
import InviteText from '../img/invite_text.png'
import Erkang from '../img/erkang.jpg'

import bgMusic from '../music/bg_1.mp3'
import silenceMusic from '../music/silence.mp3'

export default class Container extends Component {
    state = {
        stage: 1,
        musicPlaying: true
    }
    componentDidMount() {
        window.addEventListener('touchstart', this.startMusic)
    }
    nextStage = () => this.setState({stage: this.state.stage + 1})
    toggleMusic = () => {
        if (this.state.musicPlaying) {
            this.bgMusic.pause()
            this.setState({ musicPlaying: false })
        } else {
            this.bgMusic.play()
            this.setState({ musicPlaying: true })
        }
    }
    startMusic = e => {
        e.preventDefault()
        this.setState({ musicPlaying: true })
        if (this.bgMusic) {
            this.bgMusic.play()
        }
        window.removeEventListener('touchstart', this.startMusic)
    }
    render() {
        const { stage, musicPlaying } = this.state

        return (
            <div className='appContainer'>
                <iframe src={silenceMusic} title='yoyo' allow="autoplay" style={{display: 'none'}}></iframe>
                <audio autoPlay loop
                    ref={node => {this.bgMusic = node}} >
                    <source src={bgMusic} />
                </audio>
                <div className='musicBtnContainer'>
                    <Button
                        className={cx(
                            'musicBtn',
                            musicPlaying ? 'glowBorder' : null
                        )}
                        color={musicPlaying ? 'primary' : 'secondary'}
                        onClick={this.toggleMusic}>
                        {
                            musicPlaying?
                            <IoIosMusicalNotes />
                            : <IoMdVolumeOff />
                        }
                    </Button>
                </div>
                <div className='wrapper'>
                    {
                        stage === 1 ? <StageOne nextStage={this.nextStage} /> :
                        stage === 2 ? <StageTwo nextStage={this.nextStage} /> :
                        <StageThree />
                    }
                </div>
                <Decoration />
            </div>
        );
    }
}

class StageOne extends Component {
    state = {
        popover: false
    }
    togglePopover = () => this.setState({ popover: !this.state.popover })
    render() {
        const timeAddress = (
            <Popover
                target='timeAddressLookup'
                placement='top'
                isOpen={this.state.popover}
                toggle={this.togglePopover} >
                <PopoverBody>
                    <TimeAddressTable />
                </PopoverBody>
            </Popover>
        )
        return (
            <div className='stage1'>
                <div className='group1'>
                    <GotMarriedSvg className='got-married-svg' />
                </div>
                <div className='group2'>
                    <BridegroomSvg className='bride-groom-svg' />
                    <div className='nameContainer'>
                        <span className='text-name'>黄海天</span>
                        <span className='text-name'>王璐璐</span>
                    </div>
                </div>
                <div className='group3'>
                    <img className='invite-text-img' src={InviteText} alt='诚挚邀请' />
                    <div className='group4'>
                        <Button
                            outline
                            block
                            color='info'
                            className='joinBtn'
                            onClick={this.props.nextStage}>
                            我要参加
                        </Button>
                        <span id='timeAddressLookup' className='lookup-text'
                            onClick={this.togglePopover}>
                            <i>查看时间地点</i>
                        </span>
                        {timeAddress}
                    </div>
                </div>
            </div>
        )
    }
}

class StageTwo extends Component {
    state = {
        name: '',
        number: '',
        alone: false,
        buttonClicked: false
    }
    setName = (e) => this.setState({name: e.target.value})
    setNum = (e) => this.setState({number: e.target.value})
    goAlone = () => this.setState({ alone: !this.state.alone, number: 1 })
    join = () => {
        const { name, number, alone } = this.state

        this.setState({ buttonClicked: true })
        if (name.length > 1 && (alone || number)) {
            this.setState({ loading: true })
            API.add(name, alone ? 1 : number)
                .then(resp => {
                    console.log(resp)
                    this.setState({ loading: false })
                    this.props.nextStage()
                })
                .catch(err => {
                    this.setState({ loading: false, hasError: true })
                    console.log(err)
                })
        }
    }
    render() {
        const { name, number, alone, buttonClicked, loading, hasError } = this.state
        const nameWarning = buttonClicked && name.length < 2
        const numberWarning = buttonClicked && (!alone && !number)
        return (
            <div className='stage2'>
                {
                    hasError ?
                    <p className='text-danger'>网络好像不太给力，请再试一次</p>
                    : null
                }
                {
                    loading ?
                    <p className='text-info'>玩命储存中...</p>
                    :
                    <div>
                        <TimeAddressTable />
                        <span className='inputLabel'>姓名：</span>
                        {
                            nameWarning ?
                                <p className='text-danger'>忘了您的大名？</p>
                                : null
                        }
                        <Input type='text' name='name' placeholder='您的大名'
                            bsSize="lg" invalid={nameWarning}
                            value={name} onChange={this.setName} />
                        <span className='inputLabel'>人数：</span>
                        {
                            numberWarning  ?
                                <p className='text-danger'>多少人一起来？</p>
                                : null
                        }
                        <Input type='select' name='number' placeholder='跟您一起来的有几人'
                            bsSize="lg" invalid={numberWarning}
                            className={alone ? 'input-disabled' : null}
                            value={number} onChange={this.setNum}>
                            {
                                [...Array(10)].map((a,i) =>
                                    <option key={i}>{i + 1}</option>
                                )
                            }
                            <option>{'> 10'}</option>
                        </Input>
                        <label className="myCheckbox">
                            就自己去，一个人就是一个军队！
                            <input type="checkbox" value={alone}
                                onClick={this.goAlone} />
                            <span className="mark"></span>
                        </label>
                        <Button outline color="success" block
                            className={cx(
                                'callBtn',
                                name.length > 1 && (alone || number) ? 'glowBorder' : 'disabled'
                            )}
                            onClick={this.join}>
                            到场祝福
                        </Button>
                    </div>
                }
            </div>
        )
    }
}

class StageThree extends Component {
    state = { popover: false }
    togglePopover = () => this.setState({ popover: !this.state.popover })
    render() {
        const timeAddress = (
            <Popover
                target='timeAddressLookup3'
                placement='top'
                isOpen={this.state.popover}
                toggle={this.togglePopover} >
                <PopoverBody>
                    <TimeAddressTable />
                </PopoverBody>
            </Popover>
        )
        return (
            <div className='stage3'>
                <div className='welcomeText'>期待您的到来~</div>
                <div>
                    <div id='timeAddressLookup3' className='lookup-text'
                        onClick={this.togglePopover}>
                        <i>查看时间地点</i>
                    </div>
                    {timeAddress}
                    <img src={Erkang} alt='No Red Pocket!' className='erkang' />
                    <div className='note'>千万不要带红包！</div>
                    <div className='note'>千万不要带红包！</div>
                    <div className='note'>千万不要带红包！</div>
                </div>
            </div>
        )
    }
}

const TimeAddressTable = props => (
    <table className='group2-table'>
        <tbody>
            <tr>
                <td className='table-title'>时间：</td>
                <td>{Constants.DateTime}</td>
            </tr>
            <tr>
                <td className='table-title'>地点：</td>
                <td>{Constants.Address}</td>
            </tr>
        </tbody>
    </table>
)

class Decoration extends Component {
    render() {
        return (
            <div className='decoration'>
                <TreeCanvas startX={0} startY={0} startAngle={0} />
            </div>
        )
    }
}


