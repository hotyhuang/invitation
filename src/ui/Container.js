import React, { Component } from 'react';
import { Button, Popover, PopoverBody, Input } from 'reactstrap'
import cx from 'classnames'
import Constants from '../Constants'
import API from './api'
// import backgroundImg from '../img/bg.jpg'
import './Container.css';

import TreeCanvas from './TreeCanvas'

import BridegroomSvg from '../img/bride_groom'
import GotMarriedSvg from '../img/got_married'
import InviteText from '../img/invite_text.png'

export default class Container extends Component {
    state = {
        stage: 1
    }
    nextStage = () => this.setState({stage: this.state.stage + 1})
    render() {
        const { stage } = this.state
            
        const stage3 =
            <div className='stage3'>Welcome</div>
        return (
            <div className='appContainer'>
                <div className='wrapper'>
                    {stage === 1 ? <StageOne nextStage={this.nextStage} /> :
                        stage === 2 ? <StageTwo nextStage={this.nextStage} /> :
                        stage3}
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
                </PopoverBody>
            </Popover>
        )
        return (
            <div className='stage1'>
                <GotMarriedSvg className='got-married-svg' />
                <div className='middle'>
                    <BridegroomSvg className='bride-groom-svg' />
                    <div className='group1'>
                        <span className='text-name'>黄海天</span>
                        <span className='text-name'>王璐璐</span>
                    </div>
                </div>
                <div className='bottom'>
                    <img src={InviteText} alt='诚挚邀请' />
                    <div className='joinButton'>
                        <Button
                            outline
                            block
                            color='info'
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
        alone: false
    }
    setName = (e) => this.setState({name: e.target.value})
    setNum = (e) => this.setState({number: e.target.value})
    goAlone = () => this.setState({ alone: !this.state.alone })
    join = () => {
        const { name, number } = this.state
        API.add(name, number)
            .then(resp => {
                console.log(resp)
            })
            .catch(err => {
                console.log(err)
            })
        this.nextStage()
    }
    render() {
        const { name, number, alone } = this.state
        return (
            <div className='stage2'>
                <span className='inputLabel'>姓名：</span>
                <Input type='text' name='name' placeholder='您的大名'
                    bsSize="lg"
                    value={name} onChange={this.setName} />
                <span className='inputLabel'>人数：</span>
                <label class="myCheckbox">
                    就自己去，一个人就是一个军队
                    <input type="checkbox" value={alone}
                        onClick={this.goAlone} />
                    <span className="mark"></span>
                </label>
                <Input type='text' name='number' placeholder='跟您一起来的有几人'
                    bsSize="lg"
                    className={alone ? 'input-disabled' : null}
                    value={number} onChange={this.setNum} />
                <Button outline color="success" block
                    className='callBtn'
                    onClick={this.join}>
                    到场祝福
                </Button>
            </div>
        )
    }
}


class Decoration extends Component {
    render() {
        return (
            <div className='decoration'>
                <TreeCanvas startX={0} startY={0} startAngle={0} />
            </div>
        )
    }
}


