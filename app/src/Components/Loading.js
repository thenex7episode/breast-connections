import React from 'react'
import { Button } from 'antd';


class Loading extends React.Component {
    state = {
      loading: false,
      iconLoading: false,
    }
  
    enterLoading = () => {
      this.setState({ loading: true });
    }
  
    enterIconLoading = () => {
      this.setState({ iconLoading: true });
    }
  

    
    render(){
        return(
            <span>
        <Button type="primary" loading>
          Loading
        </Button>
        </span>
        )
    }
    

}
export default Loading