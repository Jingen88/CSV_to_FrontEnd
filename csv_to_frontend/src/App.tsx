import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  TableSortLabel,
  Snackbar,
  Alert,
  IconButton, 
  createTheme, 
  ThemeProvider, 
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import Brightness4Icon from '@mui/icons-material/Brightness4'; 
import Brightness7Icon from '@mui/icons-material/Brightness7'; 

// CSV data loaded from sample nuovo customer_small.csv
const initialCsvData = `
"Code","StkDesc","Weight","Expr1","Country","TransactionTypeID","SourceAreaReference","TransactionDate","Name","ProdGRP","CustomerAccountNumber","CustomerAccountName","Sales_Manager","Sales_Area","City","Channel","Route","SubCategory","AccountIsOnHold","Brand","case conversion ","cases","category","item code"
"SN-B-BOMB","Shan Biryani Bombay 12 x 60 Gm","0.0000",1,"GB",15,"2-RM-DFL",1/3/2023 0:00,"Great Britain","0001","2-RM-DFL","Dua Foods Ltd(Romford)","Hamail","London - Romford","London","T2- London","Birmingham Stratford RD","Biryani","=FALSE()","Shan","=VLOOKUP(A2,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U2*D2","=VLOOKUP(A2,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B2,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-BBQ-CTIK","Shan BBQ Chicken Tikka 12 x 50 Gm","0.0000",2,"GB",15,"2-RM-DFL",1/3/2023 0:00,"Great Britain","0001","2-RM-DFL","Dua Foods Ltd(Romford)","Hamail","London - Romford","London","T2- London","Birmingham Stratford RD","BBQ","=FALSE()","Shan","=VLOOKUP(A3,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U3*D3","=VLOOKUP(A3,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B3,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-B-BRMS","Shan Biryani Masala 12 x 50 Gm","0.0000",2,"GB",15,"2-RM-DFL",1/3/2023 0:00,"Great Britain","0001","2-RM-DFL","Dua Foods Ltd(Romford)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Biryani","=FALSE()","Shan","=VLOOKUP(A4,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U4*D4","=VLOOKUP(A4,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B4,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-C-CCHT","Shan Chaat Chana 12 x 50 Gm","0.0000",1,"GB",15,"2-RM-DFL",1/3/2023 0:00,"Great Britain","0001","2-RM-DFL","Dua Foods Ltd(Romford)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Chat","=FALSE()","Shan","=VLOOKUP(A5,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U5*D5","=VLOOKUP(A5,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B5,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-C-CHAT","Shan Chaat Masala 12 x 100 Gm","0.0000",2,"GB",15,"2-RM-DFL",1/3/2023 0:00,"Great Britain","0001","2-RM-DFL","Dua Foods Ltd(Romford)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Chat","=FALSE()","Shan","=VLOOKUP(A6,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U6*D6","=VLOOKUP(A6,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B6,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-C-FCH","Shan Chaat Fruit 12 x 50 Gm","0.0000",1,"GB",15,"2-RM-DFL",1/3/2023 0:00,"Great Britain","0001","2-RM-DFL","Dua Foods Ltd(Romford)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Chat","=FALSE()","Shan","=VLOOKUP(A7,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U7*D7","=VLOOKUP(A7,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B7,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-CHT-M-GRN","Shan. Chutney Green 12 x 400 Gm","0.0000",1,"GB",15,"2-RM-DFL",1/3/2023 0:00,"Great Britain","0001","2-RM-DFL","Dua Foods Ltd(Romford)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Sauce","=FALSE()","Shan","=VLOOKUP(A8,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U8*D8","=VLOOKUP(A8,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B8,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-BRS","Shan Masala Chicken Broast 12 x 125g","0.0000",1,"GB",15,"2-RM-DFL",1/3/2023 0:00,"Great Britain","0001","2-RM-DFL","Dua Foods Ltd(Romford)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Masala","=FALSE()","Shan","=VLOOKUP(A9,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U9*D9","=VLOOKUP(A9,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B9,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-CHBT","Shan Masala Chicken Butter 12 x 50 Gm","0.0000",1,"GB",15,"2-RM-DFL",1/3/2023 0:00,"Great Britain","0001","2-RM-DFL","Dua Foods Ltd(Romford)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Masala","=FALSE()","Shan","=VLOOKUP(A10,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U10*D10","=VLOOKUP(A10,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B10,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-KFG","Shan Masala Karahi/Fry Gosht 12 x 50 Gm","0.0000",3,"GB",15,"2-RM-DFL",1/3/2023 0:00,"Great Britain","0001","2-RM-DFL","Dua Foods Ltd(Romford)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Masala","=FALSE()","Shan","=VLOOKUP(A11,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U11*D11","=VLOOKUP(A11,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B11,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-KORM","Shan Masala Korma Curry 12 x 50 Gm","0.0000",2,"GB",15,"2-RM-DFL",1/3/2023 0:00,"Great Britain","0001","2-RM-DFL","Dua Foods Ltd(Romford)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Masala","=FALSE()","Shan","=VLOOKUP(A12,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U12*D12","=VLOOKUP(A12,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B12,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-LCH","Shan Masala Lahori Chargha 12 x 50 Gm","0.0000",1,"GB",15,"2-RM-DFL",1/3/2023 0:00,"Great Britain","0001","2-RM-DFL","Dua Foods Ltd(Romford)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Masala","=FALSE()","Shan","=VLOOKUP(A13,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U13*D13","=VLOOKUP(A13,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B13,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-MC65","Shan Masala Mix Chicken 65 12 x 60 Gm","0.0000",1,"GB",15,"2-RM-DFL",1/3/2023 0:00,"Great Britain","0001","2-RM-DFL","Dua Foods Ltd(Romford)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Masala","=FALSE()","Shan","=VLOOKUP(A14,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U14*D14","=VLOOKUP(A14,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B14,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-NEHR","Shan Masala Nihaari Curry 12 x 60 Gm","0.0000",1,"GB",15,"2-RM-DFL",1/3/2023 0:00,"Great Britain","0001","2-RM-DFL","Dua Foods Ltd(Romford)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Masala","=FALSE()","Shan","=VLOOKUP(A15,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U15*D15","=VLOOKUP(A15,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B15,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-TEN","Shan Masala. Mix Meat Tenderiser 12 x 40 Gm","0.0000",1,"GB",15,"2-RM-DFL",1/3/2023 0:00,"Great Britain","0001","2-RM-DFL","Dua Foods Ltd(Romford)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Masala","=FALSE()","Shan","=VLOOKUP(A16,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U16*D16","=VLOOKUP(A16,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B16,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-S-H-400","Shan Salt Himalayan Pink 24 x 400 Gm","0.0000",1,"GB",15,"2-RM-DFL",1/3/2023 0:00,"Great Britain","0001","2-RM-DFL","Dua Foods Ltd(Romford)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Salt","=FALSE()","Shan","=VLOOKUP(A17,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U17*D17","=VLOOKUP(A17,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B17,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-SI-MTM-165","Shan Masala South Indian Meat Curry 12 x 165Gm.","0.0000",1,"GB",15,"2-RM-DFL",1/3/2023 0:00,"Great Britain","0001","2-RM-DFL","Dua Foods Ltd(Romford)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Masala","=FALSE()","Shan","=VLOOKUP(A18,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U18*D18","=VLOOKUP(A18,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B18,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-B-BRMS","Shan Biryani Masala 12 x 50 Gm","0.0000",1,"GB",15,"2-RM-IFC",1/3/2023 0:00,"Great Britain","0001","2-RM-IFC","Elif Food Centre(Dagenham)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Biryani","=FALSE()","Shan","=VLOOKUP(A19,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U19*D19","=VLOOKUP(A19,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B19,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-B-MUT","Shan Biryani Memoni Mutton 12 x 60 Gm","0.0000",1,"GB",15,"2-RM-IFC",1/3/2023 0:00,"Great Britain","0001","2-RM-IFC","Elif Food Centre(Dagenham)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Biryani","=FALSE()","Shan","=VLOOKUP(A20,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U20*D20","=VLOOKUP(A20,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B20,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-B-SND","Shan Biryani Sindhi 12 x 60 Gm","0.0000",1,"GB",15,"2-RM-IFC",1/3/2023 0:00,"Great Britain","0001","2-RM-IFC","Elif Food Centre(Dagenham)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Biryani","=FALSE()","Shan","=VLOOKUP(A21,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U21*D21","=VLOOKUP(A21,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B21,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-C-MAS","Shan Masala Channa 12 x 100 Gm","0.0000",1,"GB",15,"2-RM-IFC",1/3/2023 0:00,"Great Britain","0001","2-RM-IFC","Elif Food Centre(Dagenham)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Masala","=FALSE()","Shan","=VLOOKUP(A22,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U22*D22","=VLOOKUP(A22,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B22,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-CHC","Shan Masala Chicken Curry 12 x 50 Gm","0.0000",1,"GB",15,"2-RM-IFC",1/3/2023 0:00,"Great Britain","0001","2-RM-IFC","Elif Food Centre(Dagenham)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Masala","=FALSE()","Shan","=VLOOKUP(A23,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U23*D23","=VLOOKUP(A23,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B23,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-FCHP","Shan Masala Fried Chops/Steaks 12 x 50 Gm","0.0000",1,"GB",15,"2-RM-IFC",1/3/2023 0:00,"Great Britain","0001","2-RM-IFC","Elif Food Centre(Dagenham)","Hamail","London - Romford","=FALSE()","T2- London","Birmingham Stratford RD","Masala","=FALSE()","Shan","=VLOOKUP(A24,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U24*D24","=VLOOKUP(A24,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B24,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-FSN","Shan Masala Fish Seasoning 12 x 50 Gm","0.0000",1,"GB",15,"2-RM-IFC",1/3/2023 0:00,"Great Britain","0001","2-RM-IFC","Elif Food Centre(Dagenham)","Hamail","=FALSE()","T2- London","Birmingham Stratford RD","Masala","=FALSE()","Shan","=VLOOKUP(A25,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U25*D25","=VLOOKUP(A25,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B25,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-MCH","Shan Masala Murgh Cholay 12 x 50 Gm","0.0000",1,"GB",15,"2-RM-IFC",1/3/2023 0:00,"Great Britain","0001","2-RM-IFC","Elif Food Centre(Dagenham)","Hamail","=FALSE()","T2- London","Birmingham Stratford RD","Masala","=FALSE()","Shan","=VLOOKUP(A26,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U26*D26","=VLOOKUP(A26,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B26,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-MVG","Shan Masala Meat & Veg Curry 12 x 100 Gm","0.0000",1,"GB",15,"2-RM-IFC",1/3/2023 0:00,"Great Britain","0001","2-RM-IFC","Elif Food Centre(Dagenham)","Hamail","=FALSE()","T2- London","Birmingham Stratford RD","Masala","=FALSE()","Shan","=VLOOKUP(A27,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U27*D27","=VLOOKUP(A27,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B27,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-PL-GG","Shan Paste. Ginger Garlic 12 x 700 Gm (Offer Price)","0.0000",0.5,"GB",15,"2-RM-IFC",1/3/2023 0:00,"Great Britain","0001","2-RM-IFC","Elif Food Centre(Dagenham)","Hamail","=FALSE()","T2- London","Birmingham Stratford RD","GGP Large","=FALSE()","Shan","=VLOOKUP(A28,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U28*D28","=VLOOKUP(A28,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B28,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-PL-GN","Shan Paste. Ginger 12 x 700 Gm (Offer Price)","0.0000",0.5,"GB",15,"2-RM-IFC",1/3/2023 0:00,"Great Britain","0001","2-RM-IFC","Elif Food Centre(Dagenham)","Hamail","=FALSE()","T2- London","Birmingham Stratford RD","GGP Large","=FALSE()","Shan","=VLOOKUP(A29,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U29*D29","=VLOOKUP(A29,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B29,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-PL-GR","Shan Paste. Garlic 12 x 700 Gm (Offer Price)","0.0000",0.5,"GB",15,"2-RM-IFC",1/3/2023 0:00,"Great Britain","0001","2-RM-IFC","Elif Food Centre(Dagenham)","Hamail","=FALSE()","T2- London","Birmingham Stratford RD","GGP Large","=FALSE()","Shan","=VLOOKUP(A30,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U30*D30","=VLOOKUP(A30,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B30,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-SUS-CHTK","Shan Sauce Chicken Tikka 12 x 350gm.","0.0000",15,"GB",15,"2-EH-BGT",1/3/2023 0:00,"Great Britain","0001","2-EH-BGT","Bagel Town (East Ham)","Hamail","=FALSE()","T2- London","Birmingham Stratford RD","Cooking Sauce","=FALSE()","Shan","=VLOOKUP(A31,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U31*D31","=VLOOKUP(A31,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B31,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-B-BOMB","Shan Biryani Bombay 12 x 60 Gm","0.0000",8,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Biryani","=FALSE()","Shan","=VLOOKUP(A32,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U32*D32","=VLOOKUP(A32,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B32,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-BBQ-BHR","Shan BBQ Bihari Kebab 12 x 50 Gm","0.0000",1,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","BBQ","=FALSE()","Shan","=VLOOKUP(A33,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U33*D33","=VLOOKUP(A33,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B33,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-BBQ-TCHK","Shan BBQ Tandoori Chicken 12 x 50 Gm","0.0000",3,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","BBQ","=FALSE()","Shan","=VLOOKUP(A34,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U34*D34","=VLOOKUP(A34,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B34,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-B-BRMS","Shan Biryani Masala 12 x 50 Gm","0.0000",4,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Biryani","=FALSE()","Shan","=VLOOKUP(A35,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U35*D35","=VLOOKUP(A35,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B35,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-B-CHK","Shan Biryani Chicken 12 x 60 Gm","0.0000",4,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Biryani","=FALSE()","Shan","=VLOOKUP(A36,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U36*D36","=VLOOKUP(A36,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B36,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-B-PLU","Shan Biryani Pilau 12 x 50 Gm","0.0000",2,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Biryani","=FALSE()","Shan","=VLOOKUP(A37,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U37*D37","=VLOOKUP(A37,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B37,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-B-SND","Shan Biryani Sindhi 12 x 60 Gm","0.0000",4,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Biryani","=FALSE()","Shan","=VLOOKUP(A38,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U38*D38","=VLOOKUP(A38,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B38,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-CH-CM","Shan Chinese Chowmein 12 x 35 Gm","0.0000",1,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Chinese","=FALSE()","Shan","=VLOOKUP(A39,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U39*D39","=VLOOKUP(A39,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B39,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-KM-50","Shan Kasuri Methi 12 x 50 GM","0.0000",1,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Masala","=FALSE()","Shan","=VLOOKUP(A40,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U40*D40","=VLOOKUP(A40,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B40,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-ABHJ","Shan Masala Aloo Bhaji 12 x 50 Gm","0.0000",1,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Masala","=FALSE()","Shan","=VLOOKUP(A41,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U41*D41","=VLOOKUP(A41,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B41,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-CHBT","Shan Masala Chicken Butter 12 x 50 Gm","0.0000",1,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Masala","=FALSE()","Shan","=VLOOKUP(A42,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U42*D42","=VLOOKUP(A42,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B42,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-COFT","Shan Masala Kofta Curry 12 x 50 Gm","0.0000",1,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Masala","=FALSE()","Shan","=VLOOKUP(A43,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U43*D43","=VLOOKUP(A43,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B43,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-ECH","Shan Masala. Mix. Easy Cook Haleem 12 x 300 Gm","0.0000",2,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Masala","=FALSE()","Shan","=VLOOKUP(A44,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U44*D44","=VLOOKUP(A44,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B44,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-KAT","Shan Masala Kat a Kat 12 x 50 Gm","0.0000",1,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Masala","=FALSE()","Shan","=VLOOKUP(A45,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U45*D45","=VLOOKUP(A45,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B45,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-KEM","Shan Masala Keema Curry 12 x 50 Gm","0.0000",1,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Masala","=FALSE()","Shan","=VLOOKUP(A46,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U46*D46","=VLOOKUP(A46,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B46,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-KFG","Shan Masala Karahi/Fry Gosht 12 x 50 Gm","0.0000",4,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Masala","=FALSE()","Shan","=VLOOKUP(A47,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U47*D47","=VLOOKUP(A47,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B47,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-KORM","Shan Masala Korma Curry 12 x 50 Gm","0.0000",3,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Masala","=FALSE()","Shan","=VLOOKUP(A48,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U48*D48","=VLOOKUP(A48,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B48,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-MTMS","Shan Masala Meat Masala 12 x 100 Gm","0.0000",2,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Masala","=FALSE()","Shan","=VLOOKUP(A49,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U49*D49","=VLOOKUP(A49,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B49,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-NEHR","Shan Masala Nihaari Curry 12 x 60 Gm","0.0000",4,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Masala","=FALSE()","Shan","=VLOOKUP(A50,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U50*D50","=VLOOKUP(A50,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B50,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-SHH","Shan Masala. Mix. Shahi Haleem 12 x 300 Gm","0.0000",2,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Masala","=FALSE()","Shan","=VLOOKUP(A51,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U51*D51","=VLOOKUP(A51,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B51,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-VEG","Shan Masala Vegetable Curry 12 x 100 Gm","0.0000",1,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Masala","=FALSE()","Shan","=VLOOKUP(A52,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U52*D52","=VLOOKUP(A52,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B52,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-S-H-400","Shan Salt Himalayan Pink 24 x 400 Gm","0.0000",1,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Salt","=FALSE()","Shan","=VLOOKUP(A53,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U53*D53","=VLOOKUP(A53,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B53,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-S-H-800","Shan Salt Himalayan Pink 18 x 800 Gm","0.0000",1,"GB",15,"2-NS-MSM",1/3/2023 0:00,"Great Britain","0001","2-NS-MSM","Madeena Supermarket Ltd-CRICKLEWOOD","Moiz","=FALSE()","T2- London","Friday","Salt","=FALSE()","Shan","=VLOOKUP(A54,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U54*D54","=VLOOKUP(A54,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B54,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-A-MNDI","Shan Arabic Mandhi 12 x 50 Gm","0.0000",2,"GB",15,"1-BR-WWC",1/3/2023 0:00,"Great Britain","0001","1-BR-WWC","Worldwide Foods Coventry Road","Imran","=FALSE()","T1- Midlands","Monday","Arabic","=FALSE()","Shan","=VLOOKUP(A55,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U55*D55","=VLOOKUP(A55,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B55,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-C-MAS","Shan Masala Channa 12 x 100 Gm","0.0000",4,"GB",15,"1-BR-WWC",1/3/2023 0:00,"Great Britain","0001","1-BR-WWC","Worldwide Foods Coventry Road","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A56,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U56*D56","=VLOOKUP(A56,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B56,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-KORM","Shan Masala Korma Curry 12 x 50 Gm","0.0000",4,"GB",15,"1-BR-WWC",1/3/2023 0:00,"Great Britain","0001","1-BR-WWC","Worldwide Foods Coventry Road","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A57,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U57*D57","=VLOOKUP(A57,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B57,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-KUNA","Shan Masala Kunna/Matka Gosht Curry 12 x 50 Gm","0.0000",2,"GB",15,"1-BR-WWC",1/3/2023 0:00,"Great Britain","0001","1-BR-WWC","Worldwide Foods Coventry Road","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A58,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U58*D58","=VLOOKUP(A58,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B58,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-PM","Shan Masala Pasanda 12 x 50 Gm","0.0000",2,"GB",15,"1-BR-WWC",1/3/2023 0:00,"Great Britain","0001","1-BR-WWC","Worldwide Foods Coventry Road","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A59,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U59*D59","=VLOOKUP(A59,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B59,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-PIC-L-MIX","Shan Pickle. Mixed 12 x 1 Kg","0.0000",1,"GB",15,"1-BR-WWC",1/3/2023 0:00,"Great Britain","0001","1-BR-WWC","Worldwide Foods Coventry Road","Imran","=FALSE()","T1- Midlands","Monday","Pickle Large","=FALSE()","Shan","=VLOOKUP(A60,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U60*D60","=VLOOKUP(A60,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B60,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-PL-GG","Shan Paste. Ginger Garlic 12 x 700 Gm (Offer Price)","0.0000",5,"GB",15,"1-BR-WWC",1/3/2023 0:00,"Great Britain","0001","1-BR-WWC","Worldwide Foods Coventry Road","Imran","=FALSE()","T1- Midlands","Monday","GGP Large","=FALSE()","Shan","=VLOOKUP(A61,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U61*D61","=VLOOKUP(A61,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B61,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-PL-GR","Shan Paste. Garlic 12 x 700 Gm (Offer Price)","0.0000",2,"GB",15,"1-BR-WWC",1/3/2023 0:00,"Great Britain","0001","1-BR-WWC","Worldwide Foods Coventry Road","Imran","=FALSE()","T1- Midlands","Monday","GGP Large","=FALSE()","Shan","=VLOOKUP(A62,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U62*D62","=VLOOKUP(A62,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B62,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-PS-GG","Shan Paste Ginger Garlic 12 x 310 Gm","0.0000",1,"GB",15,"1-BR-WWC",1/3/2023 0:00,"Great Britain","0001","1-BR-WWC","Worldwide Foods Coventry Road","Imran","=FALSE()","T1- Midlands","Monday","GGP Small","=FALSE()","Shan","=VLOOKUP(A63,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U63*D63","=VLOOKUP(A63,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B63,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-PS-GN","Shan Paste Ginger 12 x 310 Gm","0.0000",1,"GB",15,"1-BR-WWC",1/3/2023 0:00,"Great Britain","0001","1-BR-WWC","Worldwide Foods Coventry Road","Imran","=FALSE()","T1- Midlands","Monday","GGP Small","=FALSE()","Shan","=VLOOKUP(A64,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U64*D64","=VLOOKUP(A64,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B64,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-PS-GR","Shan Paste Garlic 12 x 310 Gm","0.0000",1,"GB",15,"1-BR-WWC",1/3/2023 0:00,"Great Britain","0001","1-BR-WWC","Worldwide Foods Coventry Road","Imran","=FALSE()","T1- Midlands","Monday","GGP Small","=FALSE()","Shan","=VLOOKUP(A65,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U65*D65","=VLOOKUP(A65,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B65,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"PR-SN-M-PKR","Shan Masala. Mix Pakora Bhaji 12x150Gm(Promo short dated)","0.0000",1,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","PROMO","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A66,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U66*D66","=VLOOKUP(A66,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B66,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-B-BOMB","Shan Biryani Bombay 12 x 60 Gm","0.0000",4,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","Biryani","=FALSE()","Shan","=VLOOKUP(A67,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U67*D67","=VLOOKUP(A67,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B67,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-BBQ-CTIK","Shan BBQ Chicken Tikka 12 x 50 Gm","0.0000",4,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","BBQ","=FALSE()","Shan","=VLOOKUP(A68,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U68*D68","=VLOOKUP(A68,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B68,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-BBQ-TCHK","Shan BBQ Tandoori Chicken 12 x 50 Gm","0.0000",4,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","BBQ","=FALSE()","Shan","=VLOOKUP(A69,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U69*D69","=VLOOKUP(A69,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B69,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-B-BRMS","Shan Biryani Masala 12 x 50 Gm","0.0000",4,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","Biryani","=FALSE()","Shan","=VLOOKUP(A70,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U70*D70","=VLOOKUP(A70,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B70,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-B-CHK","Shan Biryani Chicken 12 x 60 Gm","0.0000",4,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","Biryani","=FALSE()","Shan","=VLOOKUP(A71,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U71*D71","=VLOOKUP(A71,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B71,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-B-PJB","Shan Biryani Punjabi Yakhni 12 x 50 Gm","0.0000",2,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","Biryani","=FALSE()","Shan","=VLOOKUP(A72,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U72*D72","=VLOOKUP(A72,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B72,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-B-SND","Shan Biryani Sindhi 12 x 60 Gm","0.0000",4,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","Biryani","=FALSE()","Shan","=VLOOKUP(A73,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U73*D73","=VLOOKUP(A73,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B73,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-JEL-STR","Shan Sweet Jelly Crystals Strawberry 12 x 80 Gm","0.0000",1,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","Dessert","=FALSE()","Shan","=VLOOKUP(A74,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U74*D74","=VLOOKUP(A74,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B74,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-CHBT","Shan Masala Chicken Butter 12 x 50 Gm","0.0000",1,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A75,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U75*D75","=VLOOKUP(A75,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B75,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-CHP","Shan Masala Chappli Kebab 12 x 100 Gm","0.0000",2,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A76,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U76*D76","=VLOOKUP(A76,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B76,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-FCHP","Shan Masala Fried Chops/Steaks 12 x 50 Gm","0.0000",2,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A77,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U77*D77","=VLOOKUP(A77,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B77,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-KFG","Shan Masala Karahi/Fry Gosht 12 x 50 Gm","0.0000",2,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A78,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U78*D78","=VLOOKUP(A78,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B78,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-KORM","Shan Masala Korma Curry 12 x 50 Gm","0.0000",2,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A79,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U79*D79","=VLOOKUP(A79,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B79,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-LCH","Shan Masala Lahori Chargha 12 x 50 Gm","0.0000",2,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A80,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U80*D80","=VLOOKUP(A80,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B80,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-SHH","Shan Masala. Mix. Shahi Haleem 12 x 300 Gm","0.0000",1,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A81,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U81*D81","=VLOOKUP(A81,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B81,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-TEN","Shan Masala. Mix Meat Tenderiser 12 x 40 Gm","0.0000",1,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A82,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U82*D82","=VLOOKUP(A82,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B82,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-PIC-S-MIX","Shan Pickle Mix 12 x 300 Gm","0.0000",1,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","Pickle Small","=FALSE()","Shan","=VLOOKUP(A83,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U83*D83","=VLOOKUP(A83,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B83,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-PS-GG","Shan Paste Ginger Garlic 12 x 310 Gm","0.0000",1,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","GGP Small","=FALSE()","Shan","=VLOOKUP(A84,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U84*D84","=VLOOKUP(A84,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B84,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-S-H-800","Shan Salt Himalayan Pink 18 x 800 Gm","0.0000",1,"GB",15,"1-BR-PSC",1/3/2023 0:00,"Great Britain","0001","1-BR-PSC","Pak Supermarket (Coventry Road)","Imran","=FALSE()","T1- Midlands","Monday","Salt","=FALSE()","Shan","=VLOOKUP(A85,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U85*D85","=VLOOKUP(A85,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B85,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-B-BOMB","Shan Biryani Bombay 12 x 60 Gm","0.0000",4,"GB",15,"1-BR-AK",1/3/2023 0:00,"Great Britain","0001","1-BR-AK","Ak Super Market Small Heath","Imran","=FALSE()","T1- Midlands","Monday","Biryani","=FALSE()","Shan","=VLOOKUP(A86,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U86*D86","=VLOOKUP(A86,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B86,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-BBQ-CTIK","Shan BBQ Chicken Tikka 12 x 50 Gm","0.0000",1.833,"GB",15,"1-BR-AK",1/3/2023 0:00,"Great Britain","0001","1-BR-AK","Ak Super Market Small Heath","Imran","=FALSE()","T1- Midlands","Monday","BBQ","=FALSE()","Shan","=VLOOKUP(A87,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U87*D87","=VLOOKUP(A87,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B87,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-BBQ-TCHK","Shan BBQ Tandoori Chicken 12 x 50 Gm","0.0000",1,"GB",15,"1-BR-AK",1/3/2023 0:00,"Great Britain","0001","1-BR-AK","Ak Super Market Small Heath","Imran","=FALSE()","T1- Midlands","Monday","BBQ","=FALSE()","Shan","=VLOOKUP(A88,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U88*D88","=VLOOKUP(A88,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B88,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-B-BRMS","Shan Biryani Masala 12 x 50 Gm","0.0000",2,"GB",15,"1-BR-AK",1/3/2023 0:00,"Great Britain","0001","1-BR-AK","Ak Super Market Small Heath","Imran","=FALSE()","T1- Midlands","Monday","Biryani","=FALSE()","Shan","=VLOOKUP(A89,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U89*D89","=VLOOKUP(A89,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B89,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-B-CHK","Shan Biryani Chicken 12 x 60 Gm","0.0000",2,"GB",15,"1-BR-AK",1/3/2023 0:00,"Great Britain","0001","1-BR-AK","Ak Super Market Small Heath","Imran","=FALSE()","T1- Midlands","Monday","Biryani","=FALSE()","Shan","=VLOOKUP(A90,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U90*D90","=VLOOKUP(A90,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B90,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-B-SND","Shan Biryani Sindhi 12 x 60 Gm","0.0000",2,"GB",15,"1-BR-AK",1/3/2023 0:00,"Great Britain","0001","1-BR-AK","Ak Super Market Small Heath","Imran","=FALSE()","T1- Midlands","Monday","Biryani","=FALSE()","Shan","=VLOOKUP(A91,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U91*D91","=VLOOKUP(A91,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B91,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-C-CCHT","Shan Chaat Chana 12 x 50 Gm","0.0000",1,"GB",15,"1-BR-AK",1/3/2023 0:00,"Great Britain","0001","1-BR-AK","Ak Super Market Small Heath","Imran","=FALSE()","T1- Midlands","Monday","Chat","=FALSE()","Shan","=VLOOKUP(A92,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U92*D92","=VLOOKUP(A92,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B92,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-C-CHAT","Shan Chaat Masala 12 x 100 Gm","0.0000",2,"GB",15,"1-BR-AK",1/3/2023 0:00,"Great Britain","0001","1-BR-AK","Ak Super Market Small Heath","Imran","=FALSE()","T1- Midlands","Monday","Chat","=FALSE()","Shan","=VLOOKUP(A93,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U93*D93","=VLOOKUP(A93,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B93,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-ABHJ","Shan Masala Aloo Bhaji 12 x 50 Gm","0.0000",1,"GB",15,"1-BR-AK",1/3/2023 0:00,"Great Britain","0001","1-BR-AK","Ak Super Market Small Heath","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A94,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U94*D94","=VLOOKUP(A94,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B94,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-ACHG","Shan Masala Achar Gosht Curry 12 x 50 Gm","0.0000",1,"GB",15,"1-BR-AK",1/3/2023 0:00,"Great Britain","0001","1-BR-AK","Ak Super Market Small Heath","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A95,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U95*D95","=VLOOKUP(A95,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B95,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-CHC","Shan Masala Chicken Curry 12 x 50 Gm","0.0000",1,"GB",15,"1-BR-AK",1/3/2023 0:00,"Great Britain","0001","1-BR-AK","Ak Super Market Small Heath","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A96,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U96*D96","=VLOOKUP(A96,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B96,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-KEM","Shan Masala Keema Curry 12 x 50 Gm","0.0000",1,"GB",15,"1-BR-AK",1/3/2023 0:00,"Great Britain","0001","1-BR-AK","Ak Super Market Small Heath","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A97,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U97*D97","=VLOOKUP(A97,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B97,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-KORM","Shan Masala Korma Curry 12 x 50 Gm","0.0000",1,"GB",15,"1-BR-AK",1/3/2023 0:00,"Great Britain","0001","1-BR-AK","Ak Super Market Small Heath","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A98,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U98*D98","=VLOOKUP(A98,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B98,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-VEG","Shan Masala Vegetable Curry 12 x 100 Gm","0.0000",1,"GB",15,"1-BR-AK",1/3/2023 0:00,"Great Britain","0001","1-BR-AK","Ak Super Market Small Heath","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A99,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U99*D99","=VLOOKUP(A99,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B99,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
"SN-M-WQR","Shan Masala Chicken White Qorma 12 x 40 Gm","0.0000",1,"GB",15,"1-BR-AK",1/3/2023 0:00,"Great Britain","0001","1-BR-AK","Ak Super Market Small Heath","Imran","=FALSE()","T1- Midlands","Monday","Masala","=FALSE()","Shan","=VLOOKUP(A100,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:E$1048576,2,FALSE())","=U100*D100","=VLOOKUP(A100,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.D$1:F$1048576,3,FALSE())","=VLOOKUP(B100,'file:///S:/Shan Analysis/updated dashboard new shan.xlsx'#$Vlookup.A$1:G$1048576,7,FALSE())"
`;

// Function to parse CSV string into an array of objects
const parseCSV = (csvString) => {
  const lines = csvString.trim().split('\n');
  if (lines.length === 0) return { headers: [], data: [] };

  // Handle potential quotes and commas within fields
  const parseLine = (line) => {
    const values = [];
    let inQuote = false;
    let currentVal = '';
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuote = !inQuote;
      } else if (char === ',' && !inQuote) {
        values.push(currentVal.trim());
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
    values.push(currentVal.trim()); // Add the last value
    return values;
  };

  const headers = parseLine(lines[0]).map(header => header.replace(/"/g, ''));
  let idCounter = 0; // Initialize a counter for unique IDs
  const data = lines.slice(1).map(line => {
    const values = parseLine(line).map(value => value.replace(/"/g, ''));
    const rowObject = headers.reduce((obj, header, index) => {
      obj[header] = values[index] && values[index].startsWith('=VLOOKUP') ? '' : values[index];
      return obj;
    }, {});
    return { ...rowObject, id: idCounter++ }; // Add a unique 'id' to each row
  });
  return { headers, data };
};

// Function to convert an array of objects back to CSV string
const toCSV = (headers, data) => {
  const escapeValue = (value) => {
    const stringValue = String(value || '');
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  const headerRow = headers.map(escapeValue).join(',');
  const dataRows = data.map(row => headers.map(header => escapeValue(row[header])).join(','));
  return [headerRow, ...dataRows].join('\n');
};

const App = () => {
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCell, setEditingCell] = useState(null); // { rowIndex, columnId }
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc'); // 'asc' or 'desc'
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [darkMode, setDarkMode] = useState(false); 

  // Define Material-UI themes for light and dark modes
  const lightTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#1976d2',
          },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
        },
      }),
    [],
  );

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#90caf9',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
        },
      }),
    [],
  );

  useEffect(() => {
    // Simulate loading data from CSV
    const { headers: parsedHeaders, data: parsedData } = parseCSV(initialCsvData);
    setHeaders(parsedHeaders);
    setTableData(parsedData);
  }, []);

  // Filtered data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery) {
      return tableData;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return tableData.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(lowerCaseQuery)
      )
    );
  }, [tableData, searchQuery]);

  // Sorted data
  const sortedData = useMemo(() => {
    if (!orderBy) {
      return filteredData;
    }

    const comparator = (a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (aValue === null || aValue === undefined) return order === 'asc' ? 1 : -1;
      if (bValue === null || bValue === undefined) return order === 'asc' ? -1 : 1;

      // Numeric comparison if values are numbers, otherwise string comparison
      if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
        return (Number(aValue) - Number(bValue)) * (order === 'asc' ? 1 : -1);
      }
      return aValue.toString().localeCompare(bValue.toString()) * (order === 'asc' ? 1 : -1);
    };

    return [...filteredData].sort(comparator);
  }, [filteredData, orderBy, order]);

  // Handle cell click for editing
  const handleCellClick = useCallback((rowIndex, columnId) => {
    setEditingCell({ rowIndex, columnId });
  }, []);

  // Handle cell value change
  const handleCellValueChange = useCallback((e, rowIndex, columnId) => {
    const newValue = e.target.value;
    setTableData(prevData =>
      prevData.map((row, rIdx) =>
        rIdx === rowIndex ? { ...row, [columnId]: newValue } : row
      )
    );
  }, []);

  // Handle saving edited data (simulated)
  const handleSave = useCallback(() => {
    const updatedCsvString = toCSV(headers, tableData);
    console.log('Simulating save:', updatedCsvString);
    // Replace window.alert with Snackbar state update
    setSnackbarMessage('Data saved successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  }, [headers, tableData]);

  // Handle Snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Handle sorting request
  const handleRequestSort = useCallback((columnId) => {
    const isAsc = orderBy === columnId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(columnId);
  }, [orderBy, order]);

  // Toggle dark mode
  const handleToggleDarkMode = useCallback(() => {
    setDarkMode((prevMode) => !prevMode);
  }, []);

  // Calculate row count
  const rowCount = sortedData.length;

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
     <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }} className="min-h-screen p-4 font-inter justify-center items-center">
    
    <Paper elevation={3} sx={{ borderRadius: '8px', p: 3, width: '100%', maxWidth: '1280px' }}> {/* Replaced div with Paper and adjusted styling */}
          
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4, marginTop:2, }}>
            <Typography variant="h4" component="h1" className="font-extrabold roboto ">
              CSV Data Editor
            </Typography>
            {/* Dark mode toggle button */}
            <IconButton sx={{ ml: 1 }} onClick={handleToggleDarkMode} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>


          <Box className="mt-10 flex flex-col sm:flex-row justify-between sm:gap-10 gap-60 items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow w-full sm:w-auto"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              className="w-full sm:w-auto text-black px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              sx={{
                textTransform: 'none',
                color: 'black', 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
                },
                borderRadius: '8px',
              }}
            >
              Save Changes
            </Button>
            
          </Box>

          <Typography variant="subtitle1" className="mb-4">
            Total Rows Displayed: {rowCount}
          </Typography>

          <TableContainer component={Paper} className="rounded-lg shadow-lg" sx={{ bgcolor: 'background.paper' }}>
            <Table stickyHeader aria-label="csv data table">
              <TableHead className="bg-gray-200">
                <TableRow>
                  {headers.map((header) => (
                    <TableCell
                      key={header}
                      className="font-semibold text-gray-700 cursor-pointer select-none"
                      sortDirection={orderBy === header ? order : false}
                      onClick={() => handleRequestSort(header)}
                      sx={{
                        '& .MuiTableSortLabel-icon': {
                          color: (theme) => theme.palette.text.secondary + ' !important', 
                        },
                      }}
                    >
                      <TableSortLabel
                        active={orderBy === header}
                        direction={orderBy === header ? order : 'asc'}
                      >
                        {header.charAt(0).toUpperCase() + header.slice(1)}
                        {orderBy === header ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.map((row, rowIndex) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      '&:nth-of-type(even)': {
                        backgroundColor: 'action.hover', 
                      },
                      '&:hover': {
                        backgroundColor: 'action.selected', 
                      },
                    }}
                  >
                    {headers.map((columnId) => (
                      <TableCell
                        key={columnId}
                        onClick={() => handleCellClick(rowIndex, columnId)}
                        className="p-2 transition-colors duration-200" 
                         sx={{ p: 2, '&:hover': { bgcolor: 'action.hover' }, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
                      >
                        {editingCell?.rowIndex === rowIndex && editingCell?.columnId === columnId ? (
                          <TextField
                            value={tableData[rowIndex][columnId]}
                            onChange={(e) => handleCellValueChange(e, rowIndex, columnId)}
                            onBlur={() => setEditingCell(null)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                setEditingCell(null);
                              }
                            }}
                            autoFocus
                            variant="outlined"
                            size="small"
                            fullWidth
                            className="rounded-md"
                          />
                        ) : (
                          row[columnId]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default App;