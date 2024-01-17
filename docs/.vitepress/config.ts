export default {
    title: 'BoidVerse',
    description: 'Metaverse that makes a difference',
    head: [
        ['link', { rel: "stylesheet", href: "./theme/fonts/NordiquePro-Regular.ttf"}],
        ['link', { rel: "stylesheet", href: "./theme/fonts/NordiquePro-Semibold.ttf"}],
        ['link', { rel: "stylesheet", href: "./theme/fonts/Questrial-Regular.ttf"}]        
      ],
    themeConfig: {
        logo: { dark: "/logo/boid_logo_white.png", light: "/logo/boid_logo_dark.png" },
        siteTitle: false,
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Core', link: '/boidcore/' },
            { text: 'Verse', link: '/boidverse/' },
            {
              text: 'Boid Links',
              items: [
                { text: 'boid.com', link: 'https://boid.com' },
                { text: 'Boid Hub', link: 'https://testnet.hub.boid.com' },
                { text: 'Boid NFTs', link: 'https://nft.boid.com' },
                { text: 'Boid Avatars', link: 'https://avatar.boid.com' }
            ]},
            {
              text: 'bp.boid',
              items: [
                { text: 'Vote for us on Telos', link: 'https://eosauthority.com/vote/producers?network=telos' },
                { text: 'Vote for us on EOS', link: 'https://eosauthority.com/vote/producers?network=eos' }
            ]}
          ],
        socialLinks: [
                { icon: {svg: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.25 4C9.25 2.48122 10.4812 1.25 12 1.25C13.5188 1.25 14.75 2.48122 14.75 4C14.75 5.51878 13.5188 6.75 12 6.75C10.4812 6.75 9.25 5.51878 9.25 4Z"/><path d="M8.22309 11.5741L6.04779 10.849C5.42206 10.6404 5 10.0548 5 9.39526C5 8.41969 5.89953 7.69249 6.85345 7.89691L8.75102 8.30353C8.85654 8.32614 8.9093 8.33744 8.96161 8.34826C10.966 8.76286 13.034 8.76286 15.0384 8.34826C15.0907 8.33744 15.1435 8.32614 15.249 8.30353L17.1465 7.8969C18.1005 7.69249 19 8.41969 19 9.39526C19 10.0548 18.5779 10.6404 17.9522 10.849L15.7769 11.5741C15.514 11.6617 15.3826 11.7055 15.2837 11.7666C14.9471 11.9743 14.7646 12.361 14.8182 12.753C14.834 12.8681 14.8837 12.9974 14.9832 13.256L16.23 16.4977C16.6011 17.4626 15.8888 18.4997 14.8549 18.4997C14.3263 18.4997 13.8381 18.2165 13.5758 17.7574L12 14.9997L10.4242 17.7574C10.1619 18.2165 9.67373 18.4997 9.14506 18.4997C8.11118 18.4997 7.39889 17.4626 7.77003 16.4977L9.01682 13.256C9.11629 12.9974 9.16603 12.8681 9.18177 12.753C9.23536 12.361 9.05287 11.9743 8.71625 11.7666C8.61741 11.7055 8.48597 11.6617 8.22309 11.5741Z"/><path d="M12 21.9998C17.5228 21.9998 22 19.9851 22 17.4998C22 15.778 19.8509 14.282 16.694 13.5254L17.63 15.959C18.379 17.9065 16.9415 19.9996 14.8549 19.9996C13.788 19.9996 12.8028 19.4279 12.2735 18.5015L12 18.0229L11.7265 18.5015C11.1972 19.4279 10.212 19.9996 9.14506 19.9996C7.05851 19.9996 5.62099 17.9065 6.37001 15.959L7.30603 13.5254C4.14907 14.282 2 15.778 2 17.4998C2 19.9851 6.47715 21.9998 12 21.9998Z"/></svg>'}, link: 'https://community.boid.com' },
                { icon: 'facebook', link: 'https://www.facebook.com/boidcom' },
                { icon: {svg: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 455 455" xml:space="preserve"> <g> <path style="fill-rule:evenodd;clip-rule:evenodd;" d="M0,0v455h455V0H0z M384.814,100.68l-53.458,257.136 c-1.259,6.071-8.378,8.822-13.401,5.172l-72.975-52.981c-4.43-3.217-10.471-3.046-14.712,0.412l-40.46,32.981 c-4.695,3.84-11.771,1.7-13.569-4.083l-28.094-90.351l-72.583-27.089c-7.373-2.762-7.436-13.171-0.084-16.003L373.36,90.959 C379.675,88.517,386.19,94.049,384.814,100.68z"/> <path style="fill-rule:evenodd;clip-rule:evenodd;" d="M313.567,147.179l-141.854,87.367c-5.437,3.355-7.996,9.921-6.242,16.068 l15.337,53.891c1.091,3.818,6.631,3.428,7.162-0.517l3.986-29.553c0.753-5.564,3.406-10.693,7.522-14.522l117.069-108.822 C318.739,149.061,316.115,145.614,313.567,147.179z"/> </g> </svg>'}, link: 'https://t.me/boidcommunity' },
                { icon: 'twitter', link: 'https://twitter.com/boidcom' },
                { icon: 'github', link: 'https://github.com/boid-com' },

            ],
            sidebar: {
                '/boidcore/': [
                      {
                        text: 'Core contract',
                        collapsible: true,
                        collapsed: true,
                        items: [
                              { text: 'Guides', link: '/boidcore/telos/contract-index/guides' },
                              {
                                text: 'Actions',
                                collapsible: true,
                                collapsed: true,
                                items: [
                                  { text: 'Accounts', link: '/boidcore/telos/actions/accounts' },
                                  { text: 'Auth', link: '/boidcore/telos/actions/auth' },
                                  { text: 'Config', link: '/boidcore/telos/actions/config' },
                                  { text: 'Nft', link: '/boidcore/telos/actions/nft' },
                                  { text: 'Offers', link: '/boidcore/telos/actions/offers' },
                                  { text: 'Power', link: '/boidcore/telos/actions/power' },
                                  { text: 'Boosters', link: '/boidcore/telos/actions/boosters' },
                                  { text: 'Stake', link: '/boidcore/telos/actions/stake' },
                                  { text: 'Team', link: '/boidcore/telos/actions/team' },
                                  { text: 'Transfers', link: '/boidcore/telos/actions/transfers' }
                                ]
                              },
                              {
                                text: 'Tables',
                                collapsible: true,
                                collapsed: true,
                                items: [
                                  { text: 'Accounts', link: '/boidcore/telos/tables/accounts' },
                                  { text: 'Auth', link: '/boidcore/telos/tables/auth' },
                                  { text: 'Config', link: '/boidcore/telos/tables/config' },
                                  { text: 'Sponsors', link: '/boidcore/telos/tables/sponsors' },
                                  { text: 'Global', link: '/boidcore/telos/tables/global' },
                                  { text: 'Nftmint', link: '/boidcore/telos/tables/nftmint' },
                                  { text: 'NFT', link: '/boidcore/telos/tables/nfts' },
                                  { text: 'Offers', link: '/boidcore/telos/tables/offers' },
                                  { text: 'Boosters', link: '/boidcore/telos/tables/boosters' },
                                  { text: 'Stakes', link: '/boidcore/telos/tables/stakes' },
                                  { text: 'Stats', link: '/boidcore/telos/tables/stats' },
                                  { text: 'Teams', link: '/boidcore/telos/tables/teams' }
                                ]
                              },
                              {
                                text: 'More',
                                collapsible: false,
                                collapsed: true,
                                items: [
                                  { text: 'Notifications', link: '/boidcore/telos/contract-index/notifications' },
                                  { text: 'Functions', link: '/boidcore/telos/contract-index/functions' }
                                ]
                              }
                        ]
                      },
                      { text: 'Branding', link: '/boidcore/branding' },
                      { text: 'Validators', link: '/boidcore/validators/general'},
                      { text: 'Tokenomics', link: '/boidcore/tokenomics'},
                      { text: 'Terminology', link: '/boidcore/telos/contract-index/terms' },
                      { text: 'FAQ', link: '/boidcore/faq' },
                      {
                        text: 'Modules',
                        collapsible: true,
                        collapsed: true,
                        items: [
                          { text: 'Folding@Home', link: '/boidcore/modules/folding' },
                          { text: 'IPFS', link: '/boidcore/modules/ipfs' },
                          { text: 'Future', link: '/boidcore/modules/index' }
                        ]
                      }
                ],
                '/boidverse/': [
                  {
                    text: 'NFTs',
                    collapsible: true,
                    items: [
                      { text: 'Avatars', link: '/boidverse/nfts/avatars' },
                      { text: 'Science Series', link: '/boidverse/nfts/science' },
                      { text: 'Coins', link: '/boidverse/nfts/coins' },
                      { text: 'Other', link: '/boidverse/nfts/other' }
                    ]
                  },
                  {
                    text: 'Components',
                    collapsible: true,
                    items: [
                      { text: 'BoidVoid Game', link: '/boidverse/components/boidvoid' },
                      { text: 'BoidVoid Map', link: '/boidverse/components/boidvoidMapCreator' }
                    ]
                  }
                ]
            }
      }
  }
