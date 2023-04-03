import React,{ useContext } from 'react'
import noteContext from '../context/notes/noteContext';

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

const Noteitem = (props) => {
  const context=useContext(noteContext);
  const {deleteNote}=context;// destructuring
    const { note,updateNote } = props;

    // const bull = (
    //     <Box
    //       component="span"
    //       sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    //     >
    //       •
    //     </Box>
    //   );
    return (
        <div className='col-md-3'>
            
            <div className="card border-secondary mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description} </p>
                        <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                        {/* <FontAwesomeIcon icon="fa-solid fa-trash-can" /> */}
                    </div>
            </div>

            {/* <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card> */}
        </div>
    )
}





export default Noteitem
