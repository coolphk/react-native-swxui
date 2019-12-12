import {scaleSizeW, scaleSizeH, setSpText} from '../Common/ScreenUtils'


const defaltTheme = {
  colorWhite: 'white',
  colorRed: '#FD5747',
  colorTangerine: '#FFFF5F',
  colorLightGray: '#737373',
  colorLightGray2: '#B8B8B8',
  colorLightGray3: '#eee',//'#E5E5E5',
  colorBlack: '#000',
  newColor:'#d7000e',
  newActionColor:"#efefef",

  marginHorizontal: scaleSizeW(50),
  paddingHorizontal: scaleSizeW(66),
  paddingVertical: scaleSizeH(20),
  fontSize: setSpText(44),
  // CellHeight: scaleSizeH(120),
  CellHeight: scaleSizeH(115),

  lineHeight: scaleSizeH(66),

  publicHeadBottomHeight: scaleSizeH(120),
  publicFootHeight:scaleSizeH(140),


  lineLeftWidth: '40%',
  lineRightWidth: '60%',

  tabBGColor: "#F69D3A",
  tabColor: "#838381",
  titleColor: "#737373",
  buttonBGColor: "#FF9D20",
  buttonColor: "#8d8d8d",
  buttonActionColor: "#FF5F40",

  header: {
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    innerText: {
      textAlign: "center",
      //lineHeight: 60,
      justifyContent: 'center',
      color: "#ffffff",
      fontSize: setSpText(50)
    }
  },
  foot: {
    borderTopWidth: 0.5,
    borderTopColor: "#eee",
    justifyContent: 'center',
    //alignItems:"flex-start",
    height: scaleSizeH(140)
  },
  view: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: "#ffffff"
  },
  lineColor: "#E5E5E5",
  fontColor: "#737373",
  flyButtonSize:scaleSizeH(120),
  flyImgSizeWidth:scaleSizeW(180),
  flyImgSizeHeight:scaleSizeH(120),
  flyImgXSize:scaleSizeH(44),
  flyBoxWidth3:scaleSizeW(1016),
  flyBoxWidth2:scaleSizeW(679),
  flyBoxWidth1:scaleSizeW(428),
  flyBoxHeight1:scaleSizeH(244),
  flyBoxHeight2:scaleSizeH(412),
  flyBoxHeight3:scaleSizeH(602),
  newButtonFocusColor:"#FA9528",
  modalBackground: {
    flex: 1,
    backgroundColor: "#000000",
    opacity: 0.2
  },
}
export default defaltTheme
