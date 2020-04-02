import { withStyles } from '@material-ui/core'
import { Input } from '@material-ui/core'

export const CustomInput = withStyles({
  root: {
    overflow: 'hidden',
    color: '#B3B3B3',
    borderRadius: 4,
    backgroundColor: '#fff',
    padding: 8,
    '&:hover': {
      backgroundColor: '#fff'
    },
    '&$focused': {
      color: '#999',
      backgroundColor: '#fff'
    },
  },
  focused: {
    backgroundColor: '#fff'
  }
})(Input);