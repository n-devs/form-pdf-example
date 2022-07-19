import * as React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer } from 'react-pdf-browser';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

function App() {
  const [companyName, setCompanyName] = React.useState("บริษัทโตโยต้าลำปาง จำกัด");
  const [companyAddress, setCompanyAddress] = React.useState("เลขที่ 138/1 ถนนพหลโยธิน ตำบลสบตุ๋น อำเภอเมือง จังหวัดลำปาง 52100");
  const [companyPhoneNumber, setCompanyPhoneNumber] = React.useState("054-324-57983");
  const [companyFax, setCompanyFax] = React.useState("054-222-271");
  const [companyBillSubject, setCompanyBillSubject] = React.useState("ขอบวกอุปกรณ์ตกแต่งรถยนต์เพิ่ม");
  const [companyBillFrom, setCompanyBillFrom] = React.useState("ผู้จัดxxxxxxxxx");
  const [companyBillDate, setCompanyBillDate] = React.useState("14 ก.ค. 2565");
  const [companyBillItems, setCompanyBillItems] = React.useState([]);
  const [companyBillItemName, setCompanyBillItemName] = React.useState("");
  const [companyBillItemPrice, setCompanyBillItemPrice] = React.useState("0");
  const [companyBillItemSumPrice, setCompanyBillItemSumPrice] = React.useState("0");
  const [companyBillItemUnite, setCompanyBillItemUnite] = React.useState("1");
  const [companyBillItemKey, setCompanyBillItemKey] = React.useState();
  const [companyBillSumItemPrice, setCompanyBillSumItemPrice] = React.useState();
  const [companyBillVat, setCompanyBillVat] = React.useState(0);
  const [companyBillSumItemPriceAll, setCompanyBillSumItemPriceAll] = React.useState(0);
  const [steps, setStep] = React.useState([])
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);

  const handleOpenAddProduct = () => {
    setCompanyBillItemName("")
    setCompanyBillItemPrice(0)
    setCompanyBillItemUnite(1)
    setCompanyBillItemSumPrice(0)
    setOpen(true);
    setOpenUpdateDialog(false)
  };

  const handleOpenUpdateProduct = (d) => () => {
    console.log(d);
    setCompanyBillItemName(d.data.name)
    setCompanyBillItemPrice(d.data.price)
    setCompanyBillItemUnite(d.data.unit)
    setCompanyBillItemSumPrice(d.data.sumPrice)
    setOpen(true);
    setOpenUpdateDialog(true)
    setCompanyBillItemKey(d.key)
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    setOpen(false);
    companyBillItems.push({
      name: companyBillItemName,
      price: companyBillItemPrice,
      unit: companyBillItemUnite,
      sumPrice: companyBillItemSumPrice
    })
    setCompanyBillItems(companyBillItems)
    steps[3].items = companyBillItems
    setStep(steps)
  };

  const handleUpdate = () => {
    setOpen(false);
    console.log(companyBillItemPrice);
    companyBillItems[companyBillItemKey].name = companyBillItemName;
    companyBillItems[companyBillItemKey].price = companyBillItemPrice;
    companyBillItems[companyBillItemKey].unit = companyBillItemUnite;
    companyBillItems[companyBillItemKey].sumPrice = companyBillItemSumPrice;

    console.log(companyBillItems);
    setCompanyBillItems(companyBillItems)
    steps[3].items = companyBillItems
    setStep(steps)
  };

  const handleNext = (i) => () => {


    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (i === 0) {
      steps[i].name = companyName
      setStep(steps)
    } else if (i === 1) {
      steps[i].address = companyAddress
      setStep(steps)
    }

  };
  const handleFinish = (i) => () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };



  React.useEffect(() => {
    companyBillItems.map((v, i, arr) => {
      let sum;
      sum += v.priceAll;

      if ((arr.length - 1) === i) {
        setCompanyBillSumItemPrice(sum)
      }
    })
  }, [companyBillItems]);

  React.useEffect(() => {
    setCompanyBillSumItemPriceAll(companyBillSumItemPrice + companyBillVat)
  }, [companyBillSumItemPrice, companyBillVat]);

  React.useEffect(() => {
    setStep([
      {
        label: 'ชื่อบริษัท',
        name: companyName
      },
      {
        label: 'ที่อยู่บริษัท',
        address: companyAddress
      },
      {
        label: 'เบอร์โทร',
        phone: companyPhoneNumber
      },
      {
        label: 'แฟกซ์',
        fax: companyFax
      },
      {
        label: 'ใบเสนอเงิน',
        subject: companyBillSubject,
        from: companyBillFrom,
        date: companyBillDate,
        items: companyBillItems,
        sumItemPrice: companyBillSumItemPrice,
        vat: companyBillVat,
        sumItemPriceall: companyBillSumItemPriceAll
      }
    ])
  }, [companyAddress, companyBillDate, companyBillFrom, companyBillItems, companyBillSubject, companyBillSumItemPrice, companyBillSumItemPriceAll, companyBillVat, companyFax, companyName, companyPhoneNumber]);

  React.useEffect(() => {
    setCompanyBillItemSumPrice((companyBillItemPrice * companyBillItemUnite))
  }, [companyBillItemPrice, companyBillItemUnite])
  return (
    <div className="App">
      {steps && (<Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
              // optional={
              //   index === 2 ? (
              //     <Typography variant="caption">Last step</Typography>
              //   ) : null
              // }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                {index === 0 && (<TextField
                  id="filled-multiline-flexible-name"
                  label=" ชื่อ"
                  defaultValue={step.name}
                  onChange={(e) => {
                    setCompanyName(e.target.value)
                  }}
                  multiline
                  variant="standard"

                />)}
                {index === 1 && (<TextField
                  id="filled-multiline-flexible-address"
                  label="ที่อยู่"
                  defaultValue={step.address}
                  onChange={(e) => {
                    setCompanyAddress(e.target.value)
                  }}
                  multiline
                  variant="standard"

                />)}
                {index === 2 && (<TextField
                  id="filled-multiline-flexible-phone"
                  label="เบอร์"
                  defaultValue={step.phone}
                  onChange={(e) => {
                    setCompanyPhoneNumber(e.target.value)
                  }}
                  multiline
                  variant="standard"

                />)}
                {index === 3 && (<TextField
                  id="filled-multiline-flexible-fax"
                  label="แฟกซ์"
                  defaultValue={step.fax}
                  onChange={(e) => {
                    setCompanyFax(e.target.value)
                  }}
                  multiline
                  variant="standard"

                />)}
                {index === 4 && (
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}

                  >
                    <Grid item style={{
                      marginTop: 20
                    }}>
                      <TextField
                        id="filled-multiline-flexible-bill-subject"
                        label="เรื่อง"
                        defaultValue={step.subject}
                        onChange={(e) => {
                          setCompanyBillSubject(e.target.value)
                        }}
                        multiline
                        variant="standard"

                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="filled-multiline-flexible-bill-from"
                        label="เรียน"
                        defaultValue={step.from}
                        onChange={(e) => {
                          setCompanyBillFrom(e.target.value)
                        }}
                        multiline
                        variant="standard"

                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="filled-multiline-flexible-bill-date"
                        label="วันที่"
                        defaultValue={step.date}
                        onChange={(e) => {
                          setCompanyBillDate(e.target.value)
                        }}
                        multiline
                        variant="standard"

                      />
                    </Grid>
                    <Grid item>

                      <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                          <ListSubheader component="div" id="nested-list-subheader">
                            สินค้าทั้งหมด
                          </ListSubheader>
                        }
                      >
                        {step.items && step.items.map((val, index, arr) => (
                          <div key={index}>
                            <Divider />
                            <ListItemButton onClick={handleOpenUpdateProduct({ data: val, key: index, arr: arr })}>
                              <ListItemText primary={val.name} secondary={`ราคา: ${val.price} จำนวน: ${val.unit} จำนวนเงิน: ${val.sumPrice}`} />
                            </ListItemButton>

                          </div>
                        ))}
                        <Divider />
                      </List>
                      <Button onClick={handleOpenAddProduct}>เพิ่มสินค้า</Button>
                      <Dialog
                        fullScreen
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                      >
                        <AppBar sx={{ position: 'relative' }}>
                          <Toolbar>
                            <IconButton
                              edge="start"
                              color="inherit"
                              onClick={handleClose}
                              aria-label="close"
                            >
                              <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                              เพิ่มสินค้า
                            </Typography>
                            <Button autoFocus color="inherit" onClick={openUpdateDialog ? handleUpdate : handleAdd}>
                              บันทึก
                            </Button>
                          </Toolbar>
                        </AppBar>
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          spacing={2}
                          style={{
                            marginTop: 10
                          }}
                        >
                          <Grid item>
                            <TextField
                              id="filled-multiline-flexible-bill-item-name"
                              label="ชื่อสินค้า"
                              defaultValue={companyBillItemName}
                              onChange={(e) => {
                                setCompanyBillItemName(e.target.value)
                              }}
                              multiline
                              variant="standard"

                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              id="filled-multiline-flexible-bill-item-price"
                              label="ราคา"
                              defaultValue={companyBillItemPrice}
                              onChange={(e) => {
                                setCompanyBillItemPrice(e.target.value)
                              }}
                              multiline
                              type="number"
                              variant="standard"

                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              id="filled-multiline-flexible-bill-item-unit"
                              label="จำนวน"
                              defaultValue={companyBillItemUnite}
                              onChange={(e) => {
                                setCompanyBillItemUnite(e.target.value)
                              }}
                              type="number"
                              multiline
                              variant="standard"

                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              id="filled-multiline-flexible-bill-item-sum-price"
                              label="จำนวนเงิน"
                              disabled
                              value={companyBillItemSumPrice}
                              multiline
                              variant="standard"

                            />
                          </Grid>
                        </Grid>
                      </Dialog>
                    </Grid>
                  </Grid>)}
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={index === steps.length - 1 ? handleFinish(index) : handleNext(index)}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'สำเร็จ' : 'ถัดไป'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      ย้อนกลับ
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            {/* <Typography>All steps completed - you&apos;re finished</Typography> */}
            {/* <PDFViewer>
            <MyDocument />
            </PDFViewer> */}
            <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
              {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>

            {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button> */}
          </Paper>
        )}
      </Box>)}

    </div>
  );
}

export default App;
