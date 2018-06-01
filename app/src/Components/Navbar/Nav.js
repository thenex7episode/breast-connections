import React, { Component } from 'react';
import axios from 'axios';
import './nav.css'
import { Link } from 'react-router-dom';
import textLogo from '../textlogo1.png';
import { Menu, Dropdown, Icon, Button, Avatar } from 'antd';
const SubMenu = Menu.SubMenu;


const menu = (
    <Menu>
      <Menu.Item>
        <Link to='/dashboard/motivation'>Motivation</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/dashboard/family'>Family</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/dashboard/resources'>Resources</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/dashboard/nutrition'>Nutrition</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/dashboard/health'>Health</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/dashboard/financial'>Financial</Link>
      </Menu.Item>
    </Menu>
  );


export default class Nav extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            user_id: null,
            nav: false
        }
    }

    logout= () => {
        axios.post('/logout').then(() => {
        window.location = '/'
        }).catch(e => {console.log('Logout error', e)})
      }

    componentDidMount(){
        axios.get('/api/check-session').then(r => {
              if(r.data.username) {
                  this.setState({username: r.data.username, user_id: r.data.user_id, image: r.data.imageurl})
              } else {
                  console.log('not logged in')
                  this.props.history.location.push('/login')
              }
          }).catch(err => {console.log('WWEEEWWWOOOWWWEEEWWWOOO',err)})
      }

    render() {
        return (
            <div>
            <nav>
                <div><img src={textLogo} alt="logo" style={{width: '250px'}}/></div>
                <ul className='deskNav'>
                    <li><Icon className='navIcon' type="laptop" /><Link to={this.state.username ? '/dashboard' : '/'}>Home</Link></li>
                    <Dropdown overlay={menu}>
                    <li><Icon className='navIcon' type="team" /><Link to='/forums'>Forums</Link></li>
                    </Dropdown>
                    <li><Icon className='navIcon' type="environment" /><Link to='/search'>Search</Link></li>
                    <li><Icon className='navIcon' type="shopping-cart" /><Link to='/shop'>Shop</Link></li>
                    <li><Icon className='navIcon' type="bulb" /><Link to='/info'>Info</Link></li>
                    <li style={{display: this.state.user_id ? 'none' : 'block'}}><Link to='/login'><Button icon="user">Login</Button></Link></li>
                    <Dropdown overlay={<Menu>
                                            <Menu.Item>
                                                <Icon type='user' />
                                                <Link to={`/profile/${this.state.username}`}>Profile</Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Icon type='chat' />
                                                <Link to={`/chatroom/`}>Chat</Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Icon type='logout' />
                                                <Link onClick={() => this.logout()}to='/dashboard/motivation'>Logout</Link>
                                            </Menu.Item>
                                        </Menu>}>
                    <Link to={`/profile/${this.state.username}`}><Avatar style={{display: this.state.user_id ? 'block' : 'none', margin: '0.7em'}} size="large" src={this.state.image} /></Link>
                    </Dropdown>
                </ul>
                <Icon className='hamburger' onClick={() => this.setState({nav: !this.state.nav})} type={this.state.nav ? 'menu-unfold' : 'menu-fold'} />
            </nav>
            <ul style={{right: this.state.nav ? '0' : '-100%'}} className='mobNav'>
                <li><Icon className='navIcon' type="laptop" /><Link to={this.state.username ? '/dashboard' : '/'}>Home</Link></li>
                <li><Icon className='navIcon' type="team" /><Link to='/dashboard'>Forums</Link></li>
                <li><Icon className='navIcon' type="environment" /><Link to='/search'>Search</Link></li>
                <li><Icon className='navIcon' type="shopping-cart" /><Link to='/shop'>Shop</Link></li>
                <li><Icon className='navIcon' type="bulb" /><Link to='/info'>Info</Link></li>
                <li><Icon className='navIcon' type="chat" /><Link to='/chatroom'>Chat</Link></li>
                <li style={{display: this.state.user_id ? 'none' : 'block'}}><Link to='/login'><Button icon="user">Login</Button></Link></li>
            </ul>
            </div>
        );
    }
}