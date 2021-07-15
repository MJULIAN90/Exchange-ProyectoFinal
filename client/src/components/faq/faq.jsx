import React from 'react'
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import useStyles from 'styles.js'

export default function Faq() {


    const classes = useStyles();

    return (
        <Container>
            

                <Typography variant='h4' className={classes.button} >FAQ</Typography>

                <Typography variant='h5' className={classes.cryptoCurrency}>About us</Typography>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                    >
                        <Typography variant='h6' >What is RocketChange?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam deleniti ullam perferendis </Typography>
                    </AccordionDetails>

                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                    >
                        <Typography variant='h6'>How does RocketChange work?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam deleniti ullam perferendis </Typography>
                    </AccordionDetails>

                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                    >
                        <Typography variant='h6'>Why trust us?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam deleniti ullam perferendis </Typography>
                    </AccordionDetails>

                </Accordion>


                <Typography variant='h5' className={classes.cryptoCurrency}>Cryptocurrency Exchange</Typography>


                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                    >
                        <Typography variant='h6'>How fast will my transaction be processed?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam deleniti ullam perferendis </Typography>
                    </AccordionDetails>

                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                    >
                        <Typography variant='h6'>What is the minimal exchange amount on RocketChange?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam deleniti ullam perferendis </Typography>
                    </AccordionDetails>

                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                    >
                        <Typography variant='h6'>Do I need to register to use RocketChange?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam deleniti ullam perferendis </Typography>
                    </AccordionDetails>

                </Accordion>
                <Typography variant='h5' className={classes.cryptoCurrency}>Buy crypto with Fiat</Typography>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                    >
                        <Typography variant='h6'>Can I buy cryptocurrency with fiat through RocketChange?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam deleniti ullam perferendis </Typography>
                    </AccordionDetails>

                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                    >
                        <Typography variant='h6'>What fees are there for purchasing crypto with USD/EUR card on RocketChange?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam deleniti ullam perferendis </Typography>
                    </AccordionDetails>

                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                    >
                        <Typography variant='h6'>What card can i use to buy crypto on RocketChange?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam deleniti ullam perferendis </Typography>
                    </AccordionDetails>

                </Accordion>
            
        </Container>
    )
}
