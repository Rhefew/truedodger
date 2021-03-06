return {
  version = "1.5",
  luaversion = "5.1",
  tiledversion = "1.7.0",
  orientation = "orthogonal",
  renderorder = "right-down",
  width = 24,
  height = 18,
  tilewidth = 38,
  tileheight = 38,
  nextlayerid = 6,
  nextobjectid = 10,
  properties = {},
  tilesets = {
    {
      name = "2",
      firstgid = 1,
      tilewidth = 38,
      tileheight = 38,
      spacing = 2,
      margin = 0,
      columns = 3,
      image = "terrain/2.png",
      imagewidth = 128,
      imageheight = 128,
      objectalignment = "unspecified",
      tileoffset = {
        x = 0,
        y = 0
      },
      grid = {
        orientation = "orthogonal",
        width = 38,
        height = 38
      },
      properties = {},
      wangsets = {},
      tilecount = 9,
      tiles = {
        {
          id = 0,
          animation = {
            {
              tileid = 0,
              duration = 150
            },
            {
              tileid = 2,
              duration = 150
            },
            {
              tileid = 1,
              duration = 150
            }
          }
        },
        {
          id = 1,
          animation = {
            {
              tileid = 1,
              duration = 150
            },
            {
              tileid = 2,
              duration = 150
            },
            {
              tileid = 0,
              duration = 150
            }
          }
        },
        {
          id = 2,
          animation = {
            {
              tileid = 2,
              duration = 150
            },
            {
              tileid = 0,
              duration = 150
            },
            {
              tileid = 1,
              duration = 150
            }
          }
        },
        {
          id = 3,
          animation = {
            {
              tileid = 3,
              duration = 150
            },
            {
              tileid = 4,
              duration = 150
            },
            {
              tileid = 5,
              duration = 150
            }
          }
        },
        {
          id = 4,
          animation = {
            {
              tileid = 4,
              duration = 150
            },
            {
              tileid = 5,
              duration = 150
            },
            {
              tileid = 3,
              duration = 150
            }
          }
        },
        {
          id = 5,
          animation = {
            {
              tileid = 5,
              duration = 150
            },
            {
              tileid = 3,
              duration = 150
            },
            {
              tileid = 4,
              duration = 150
            }
          }
        },
        {
          id = 6,
          animation = {
            {
              tileid = 6,
              duration = 150
            },
            {
              tileid = 7,
              duration = 150
            },
            {
              tileid = 8,
              duration = 150
            }
          }
        },
        {
          id = 7,
          animation = {
            {
              tileid = 7,
              duration = 150
            },
            {
              tileid = 8,
              duration = 150
            },
            {
              tileid = 6,
              duration = 150
            }
          }
        },
        {
          id = 8,
          animation = {
            {
              tileid = 8,
              duration = 150
            },
            {
              tileid = 6,
              duration = 150
            },
            {
              tileid = 7,
              duration = 150
            }
          }
        }
      }
    },
    {
      name = "5",
      firstgid = 10,
      tilewidth = 38,
      tileheight = 38,
      spacing = 2,
      margin = 0,
      columns = 3,
      image = "terrain/5.png",
      imagewidth = 128,
      imageheight = 128,
      objectalignment = "unspecified",
      tileoffset = {
        x = 0,
        y = 0
      },
      grid = {
        orientation = "orthogonal",
        width = 38,
        height = 38
      },
      properties = {},
      wangsets = {},
      tilecount = 9,
      tiles = {
        {
          id = 0,
          animation = {
            {
              tileid = 0,
              duration = 150
            },
            {
              tileid = 1,
              duration = 150
            },
            {
              tileid = 2,
              duration = 150
            }
          }
        },
        {
          id = 1,
          animation = {
            {
              tileid = 1,
              duration = 150
            },
            {
              tileid = 2,
              duration = 150
            },
            {
              tileid = 0,
              duration = 150
            }
          }
        },
        {
          id = 2,
          animation = {
            {
              tileid = 2,
              duration = 150
            },
            {
              tileid = 0,
              duration = 150
            },
            {
              tileid = 1,
              duration = 150
            }
          }
        },
        {
          id = 3,
          animation = {
            {
              tileid = 3,
              duration = 150
            },
            {
              tileid = 4,
              duration = 150
            },
            {
              tileid = 5,
              duration = 150
            }
          }
        },
        {
          id = 4,
          animation = {
            {
              tileid = 4,
              duration = 150
            },
            {
              tileid = 5,
              duration = 150
            },
            {
              tileid = 3,
              duration = 150
            }
          }
        },
        {
          id = 5,
          animation = {
            {
              tileid = 5,
              duration = 150
            },
            {
              tileid = 3,
              duration = 150
            },
            {
              tileid = 4,
              duration = 150
            }
          }
        },
        {
          id = 6,
          animation = {
            {
              tileid = 6,
              duration = 150
            },
            {
              tileid = 7,
              duration = 150
            },
            {
              tileid = 8,
              duration = 150
            }
          }
        },
        {
          id = 7,
          animation = {
            {
              tileid = 7,
              duration = 150
            },
            {
              tileid = 8,
              duration = 150
            },
            {
              tileid = 6,
              duration = 150
            }
          }
        },
        {
          id = 8,
          animation = {
            {
              tileid = 8,
              duration = 150
            },
            {
              tileid = 6,
              duration = 150
            },
            {
              tileid = 7,
              duration = 150
            }
          }
        }
      }
    }
  },
  layers = {
    {
      type = "tilelayer",
      x = 0,
      y = 0,
      width = 24,
      height = 18,
      id = 4,
      name = "map",
      visible = true,
      opacity = 1,
      offsetx = 0,
      offsety = 0,
      parallaxx = 1,
      parallaxy = 1,
      properties = {},
      encoding = "lua",
      data = {
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3,
        4, 5, 6, 4, 5, 6, 4, 5, 6, 4, 5, 6, 4, 5, 6, 4, 5, 6, 4, 5, 6, 4, 5, 6,
        7, 8, 9, 7, 8, 9, 7, 8, 9, 7, 8, 9, 7, 8, 9, 7, 8, 9, 7, 8, 9, 7, 8, 9,
        10, 11, 12, 10, 11, 12, 10, 11, 12, 10, 11, 12, 10, 11, 12, 10, 11, 12, 10, 11, 12, 10, 11, 12,
        13, 14, 15, 13, 14, 15, 13, 14, 15, 13, 14, 15, 13, 14, 15, 13, 14, 15, 13, 14, 15, 13, 14, 15,
        16, 17, 18, 16, 17, 18, 16, 17, 18, 16, 17, 18, 16, 17, 18, 16, 17, 18, 16, 17, 18, 16, 17, 18
      }
    },
    {
      type = "objectgroup",
      draworder = "topdown",
      id = 5,
      name = "Platform",
      visible = true,
      opacity = 1,
      offsetx = 0,
      offsety = 0,
      parallaxx = 1,
      parallaxy = 1,
      properties = {},
      objects = {
        {
          id = 5,
          name = "Platform",
          type = "",
          shape = "rectangle",
          x = 0,
          y = 464,
          width = 816,
          height = 136,
          rotation = 0,
          visible = true,
          properties = {}
        }
      }
    }
  }
}
