import React from 'react';
import { Grid, Typography, Box, Breadcrumbs, Link, Divider, Card, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

import breadcrumbImg from 'src/assets/images/breadcrumb/ChatBc.png';
import { IconCircle } from '@tabler/icons';
import { useUtils } from '../../../../zustand/Utils/utilStore';

const Breadcrumb = ({ subtitle, items, title, children, tabs }) => {
  const { setSelectedTab, selected_tab } = useUtils(store => store);
  return (
    <Card
      container
      sx={{
        backgroundColor: '#fff',
        // borderRadius: (theme) => theme.shape.borderRadius / 4,
        p: '30px 25px 20px',
        my: '30px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Grid item xs={12} sm={6} lg={8} mb={1}>
        <Typography variant="h2" sx={{
          fontWeight: 'bold'
        }}>{title}</Typography>
        <Typography color="textSecondary" variant="h6" fontWeight={400} mt={0.8} mb={0}>
          {subtitle}
        </Typography>
        {!tabs && <Breadcrumbs
          separator={
            '/'
          }
          sx={{ alignItems: 'center', mt: items ? '10px' : '' }}
          aria-label="breadcrumb"
        >
          {items
            ? items.map((item) => (
              <div key={item.title}>
                {item.to ? (
                  <Link underline="hover" color="inherit" component={NavLink} to={item.to}>
                    {item.title}
                  </Link>
                ) : (
                  <Typography color="textPrimary">{item.title}</Typography>
                )}
              </div>
            ))
            : ''}
        </Breadcrumbs>}
        {tabs && <Box style={{
          display: 'flex',
          gap: '1.125rem',
          marginTop: '2rem'
        }}>
          {tabs.map(tab => (
            <Button
              variant={selected_tab.value == tab.value ? "contained" : "text"}
              onClick={() => setSelectedTab({
                page: 'config',
                value: tab.value
              })}>{tab.title}</Button>
          ))}
        </Box>}
      </Grid>
      <Grid item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
        <Box
          sx={{
            display: { xs: 'none', md: 'block', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          {children ? (
            <Box sx={{ top: '0px', position: 'absolute' }}>
              {/* {children} */}
            </Box>
          ) : (
            <>
              {/* <Box sx={{ top: '0px', position: 'absolute' }}>
                <img src={breadcrumbImg} alt={breadcrumbImg} width={'165px'} />
              </Box> */}
            </>
          )}
        </Box>
      </Grid>

    </Card>
  )
};

export default Breadcrumb;