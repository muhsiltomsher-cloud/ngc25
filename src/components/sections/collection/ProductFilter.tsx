'use client';

import React, { useMemo, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Autocomplete,
  TextField,
  Avatar,
  Stack,
  Tooltip,
  IconButton,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import type { Brand } from '@/data/brands';
import { allProducts } from '@/data/productsData';

export type FilterState = {
  search: string;
  brand: string[];
  segment: string[];
  category: string[];
  subCategory: string[];
};

interface ProductFilterProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  brands: Brand[];
}

const SECTION_GAP = 2;

export default function ProductFilter({ filter, setFilter, brands }: ProductFilterProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);

  const { segments, categories, subCategories, searchOptions } = useMemo(() => {
    const seg = new Set<string>();
    const cat = new Set<string>();
    const sub = new Set<string>();
    const options: { label: string; image: string; value: string; subLabel?: string }[] = [];
    const fallbackImage = '/images/colors/placeholder.jpg';
    allProducts.forEach(p => {
      if (p.segment) seg.add(p.segment);
      if (p.category) cat.add(p.category);
      if (p.subCategory) sub.add(p.subCategory);
      options.push({
        label: p.name,
        image: p.image || fallbackImage,
        value: p.id,
        subLabel: p.brandKey,
      });
    });
    options.sort((a, b) => a.label.localeCompare(b.label));
    return {
      segments: Array.from(seg).sort(),
      categories: Array.from(cat).sort(),
      subCategories: Array.from(sub).sort(),
      searchOptions: options,
    };
  }, []);

  const uniqueBrands = useMemo(() => {
    const map = new Map<string, string>();
    brands.forEach(brand => {
      if (!map.has(brand.key)) {
        map.set(brand.key, brand.title);
      }
    });
    return Array.from(map.entries())
      .map(([key, title]) => ({ key, title }))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [brands]);

  type MultiSelectKey = 'brand' | 'segment' | 'category' | 'subCategory';

  const handleToggle = (key: MultiSelectKey, value: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setFilter(prev => {
      const current = prev[key];
      if (checked && !current.includes(value)) {
        return { ...prev, [key]: [...current, value] };
      }
      if (!checked && current.includes(value)) {
        return { ...prev, [key]: current.filter(item => item !== value) };
      }
      return prev;
    });
  };

  const clearFilters = () => {
    if (uploadedPreview) {
      URL.revokeObjectURL(uploadedPreview);
      setUploadedPreview(null);
    }
    setFilter({ search: '', brand: [], segment: [], category: [], subCategory: [] });
  };

  const hasActiveFilters =
    filter.search.length ||
    filter.brand.length ||
    filter.segment.length ||
    filter.category.length ||
    filter.subCategory.length;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (uploadedPreview) {
      URL.revokeObjectURL(uploadedPreview);
    }
    const previewUrl = URL.createObjectURL(file);
    setUploadedPreview(previewUrl);
    setFilter(prev => ({
      ...prev,
      search: file.name.replace(/\.[^/.]+$/, '').split(/[-_]/).join(' '),
    }));
  };

  const clearSearchOnly = () => {
    if (uploadedPreview) {
      URL.revokeObjectURL(uploadedPreview);
      setUploadedPreview(null);
    }
    setFilter(prev => ({ ...prev, search: '' }));
  };

  const renderCheckboxGroup = (
    title: string,
    key: MultiSelectKey,
    options: { key: string; label: string }[]
  ) => (
    <Box>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
        {title}
      </Typography>
      <FormGroup>
        {options.map(option => {
          const value = option.key;
          const label = option.label;
          return (
            <FormControlLabel
              key={value}
              control={
                <Checkbox
                  size="small"
                  checked={filter[key].includes(value)}
                  onChange={handleToggle(key, value)}
                />
              }
              label={label}
            />
          );
        })}
      </FormGroup>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: SECTION_GAP,
        height: '100%',
      }}
    >
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="caption"
              sx={{ letterSpacing: 2, fontWeight: 700, color: 'text.primary' }}
            >
              AI IMAGE SEARCH
            </Typography>
            <Tooltip title="Search by keyword or upload an inspiration image to find matching wallcoverings.">
              <InfoOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            </Tooltip>
          </Stack>
          {filter.search && (
            <IconButton size="small" aria-label="Clear search" onClick={clearSearchOnly}>
              <CloseRoundedIcon sx={{ fontSize: 14 }} />
            </IconButton>
          )}
        </Stack>

        <Autocomplete
          freeSolo
          disableClearable
          forcePopupIcon={false}
          options={searchOptions}
          getOptionLabel={option => (typeof option === 'string' ? option : option.label)}
          onChange={(_, option) =>
            setFilter(prev => ({
              ...prev,
              search: typeof option === 'string' ? option : option?.label ?? '',
            }))
          }
          inputValue={filter.search}
          onInputChange={(_, value) => setFilter(prev => ({ ...prev, search: value }))}
          renderOption={(props, option) => (
            <li {...props}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  src={option.image}
                  alt={option.label}
                  variant="rounded"
                  sx={{ width: 40, height: 40 }}
                />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {option.label}
                  </Typography>
                  {option.subLabel && (
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {option.subLabel}
                    </Typography>
                  )}
                </Box>
              </Stack>
            </li>
          )}
          renderInput={params => (
            <TextField
              {...params}
              placeholder="Ex: Floral, Emerald, 80s, etc."
              size="small"
              InputProps={{
                ...params.InputProps,
                sx: {
                  borderRadius: 1.5,
                  pr: 0,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'grey.300',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'grey.500',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'grey.700',
                  },
                },
                endAdornment: (
                  <Stack direction="row" alignItems="center" spacing={0} sx={{ height: '100%' }}>
                    <Divider orientation="vertical" flexItem sx={{ borderColor: 'divider', mr: 1 }} />
                    <IconButton
                      size="small"
                      sx={{
                        borderRadius: 0,
                        borderLeft: theme => `1px solid ${theme.palette.divider}`,
                        height: '100%',
                        width: 40,
                      }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageOutlinedIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        borderRadius: 0,
                        backgroundColor: '#4b453f',
                        color: 'common.white',
                        height: '100%',
                        width: 40,
                        '&:hover': {
                          backgroundColor: '#3a352f',
                        },
                      }}
                    >
                      <ArrowForwardIosRoundedIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Stack>
                ),
              }}
            />
          )}
        />
        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />
        {uploadedPreview && (
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{
              mt: 2,
              p: 1.25,
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 2,
              backgroundColor: 'grey.50',
            }}
          >
            <Avatar
              variant="rounded"
              src={uploadedPreview}
              sx={{ width: 48, height: 48 }}
              alt="Inspiration preview"
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Inspiration image added
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Tone and pattern cues will influence your results.
              </Typography>
            </Box>
            <IconButton size="small" onClick={clearSearchOnly} aria-label="Remove inspiration image">
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>
        )}
      </Box>

      {renderCheckboxGroup(
        'Brands',
        'brand',
        uniqueBrands.map(brand => ({ key: brand.key, label: brand.title }))
      )}
      <Divider />
      {renderCheckboxGroup(
        'Segments',
        'segment',
        segments.map(item => ({ key: item, label: item }))
      )}
      <Divider />
      {renderCheckboxGroup(
        'Categories',
        'category',
        categories.map(item => ({ key: item, label: item }))
      )}
      <Divider />
      {renderCheckboxGroup(
        'Subcategories',
        'subCategory',
        subCategories.map(item => ({ key: item, label: item }))
      )}
      <Divider />
      <Button
        variant="outlined"
        color="primary"
        onClick={clearFilters}
        disabled={!hasActiveFilters}
        sx={{
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 600,
        }}
      >
        Clear Filters
      </Button>
    </Box>
  );
}


