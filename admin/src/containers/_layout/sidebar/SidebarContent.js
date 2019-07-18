import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import SidebarLink from './SidebarLink';
//import SidebarCategory from './SidebarCategory';

class SidebarContent extends PureComponent
{
    hideSidebar = () => {
        this.props.onClick();
    };

    render() {
        return (
            <div className='sidebar__content'>
                <ul className='sidebar__block'>
                    <SidebarLink title='User' icon='user' route='/' onClick={this.hideSidebar}/>
                </ul>
                <ul className='sidebar__block'>
                    <SidebarLink title='email' icon='file-add' route='/email' onClick={this.hideSidebar}/>
                </ul>
                <ul className='sidebar__block'>
                    <SidebarLink title='product' icon='file-add' route='/product' onClick={this.hideSidebar}/>
                </ul>
                <ul className='sidebar__block'>
                    <SidebarLink title='language' icon='list' route='/language' onClick={this.hideSidebar}/>
                </ul>
                {/*<ul className='sidebar__block'>*/}
                    {/*<SidebarLink title='Text Editor' icon='map' route='/text_editor' onClick={this.hideSidebar}/>*/}
                    {/*<SidebarCategory title='Forms' icon='file-add'>*/}
                        {/*<SidebarLink title='Basic Form' route='/forms/basic_form' onClick={this.hideSidebar}/>*/}
                        {/*<SidebarLink title='Check Form Controls' route='/forms/check_form_controls' onClick={this.hideSidebar}/>*/}
                    {/*</SidebarCategory>*/}
                {/*</ul>*/}
            </div>
        )
    }
}

export default connect()(SidebarContent);
