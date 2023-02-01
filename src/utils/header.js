export const navbar = [
      
      {
        name: "Analysis",
        firstChilds: [
          {
            name: "Presidential",
            secondChilds: [
              {
                name: "Polling Unit",
                link: "/analysis/presidential",
                routeLevel : 5
              }
              ,
              {
                name: "Ward",
                link: "/analysis/presidential",
                routeLevel : 4
              }
              ,
              {
                name: "LGA",
                link: "/analysis/presidential",
                routeLevel : 3
              }
              ,
              {
                name: "State",
                link: "/analysis/presidential",
                routeLevel : 2
              }
              ,
              {
                name: "National",
                link: "/analysis/presidential",
                routeLevel : 1

              }
            ],
          },
          {
            name: "Senate",
            secondChilds: [
                {
                  name: "Polling Unit",
                  link: "/analysis/senate",
                  routeLevel : 5
                }
                ,
                {
                  name: "Ward",
                  link: "/analysis/senate",
                  routeLevel : 4
                }
                ,
                {
                  name: "LGA",
                  link: "/analysis/senate",
                  routeLevel : 3
                }
                ,
                {
                  name: "District",
                  link: "/analysis/senate",
                  routeLevel : 2
                }
                ,
                {
                  name: "National",
                  link: "/analysis/senate",
                  routeLevel : 1
                }
                ,
              ],
          },
          {
            name: "REP",
            secondChilds: [
                {
                  name: "Polling Unit",
                  link: "/analysis/rep",
                  routeLevel : 4
                }
                ,
                {
                  name: "Ward",
                  link: "/analysis/rep",
                  routeLevel : 3
                }
                ,
                {
                  name: "LGA",
                  link: "/analysis/rep",
                  routeLevel : 2
                }
                ,
                {
                  name: "Consitituency",
                  link: "/analysis/rep",
                  routeLevel : 1
                }
                ,
              ],
          },
        ],
      },
];


export const resultNav = [
  {
    name: "Results",
    firstChilds: [
      {
        name: "Presidential",
        secondChilds: [
          {
            name: "Polling Unit",
            link: "/results/presidential",
            routeLevel : 5
          },
          {
            name: "Ward",
            link: "/results/presidential",
            routeLevel : 4
          },
          {
            name: "LGA",
            link: "/results/presidential",
            routeLevel : 3
          },
          {
            name: "State",
            link: "/results/presidential",
            routeLevel : 2
          },
          {
            name: "National",
            link: "/results/presidential",
            routeLevel: 1
          }
        ],
      },
      {
        name: "Senate",
        secondChilds: [
            {
              name: "Polling Unit",
              link: "/results/senate",
              routeLevel : 4
            },
            {
              name: "Ward",
              link: "/results/senate",
              routeLevel : 3
            },
            {
              name: "LGA",
              link: "/results/senate",
              routeLevel : 2
            },
            {
              name: "District",
              link: "/results/senate",
              routeLevel : 1
            },
          ],
      },
      {
        name: "REP",
        secondChilds: [
            {
              name: "Polling Unit",
              link: "/results/rep",
              routeLevel : 4
            },
            {
              name: "Ward",
              link: "/results/rep",
              routeLevel : 3
            },
            {
              name: "LGA",
              link: "/results/rep",
              routeLevel : 2
            },
            {
              name: "Consitituency",
              link: "/results/rep",
              routeLevel : 1
            },
          ],
      },
    ],
  },
]

export const collationNav = [
  {
    name: "Collation",
    firstChilds: [
      {
        name: "Presidential",
        secondChilds: [
          {
            name: "Polling Unit",
            link: "/polling-coalition",
          },
          {
            name: "Ward",
            link: "/ward-coalition",
          },
          {
            name: "LGA",
            link: "/lga-coalition"
          },
          {
            name: "State",
            link: "/state-coalition"
          },
          {
            name: "National",
            link: "/country-coalition"
          }
        ],
      },
      {
        name: "Senate",
        secondChilds: [
            {
              name: "Polling Unit",
              key : "senate-pu",
              link: "/polling-coalition",
            },
            {
              name: "Ward",
              key : "senate-ward",
              link: "/ward-coalition",
            },
            {
              name: "LGA",
              key : "senate-lga",
              link: "/lga-coalition"
            },
            {
              name: "District",
              key : "district",
              link: "/collation-district"
            },
          ],
      },
      {
        name: "REP",
        secondChilds: [
            {
              name: "Polling Unit",
              key : "rep-pu",
              link: "/polling-coalition",
            },
            {
              name: "Ward",
              key : "rep-ward",
              link: "/ward-coalition",
            },
            {
              name: "LGA",
              key : "rep-lga",
              link: "/lga-coalition"
            },
            {
              name: "Consitituency",
              key : "constituency",
              link: "/collation-constituency"
            },
          ],
      },
    ],
  },
]


export const InformationNav = [
  {
    key : "polling unit",
    path : "/polling-info",
    label : "Polling Units"
  },
  {
    key : "ward",
    path : "/ward",
    label : "Wards"
  },
  {
    key : "lga",
    path : "/lga",
    label : "LGAs"
  },
  {
    key : "district",
    path : "/district",
    label : "District"
  },
  {
    key : "constituency",
    path : "/constituency",
    label : "Constituency"
  },
  {
    key : "state",
    path : "/state",
    label : "States"
  },
  {
    key : "country",
    path : "/country",
    label : "Country"
  }
]