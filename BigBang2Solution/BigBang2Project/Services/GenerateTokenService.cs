﻿using BigBang2Project.Interfaces;
using BigBang2Project.Models.DTOs;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BigBang2Project.Services
{
    public class GenerateTokenService : ITokenGenerate
    {
            private readonly SymmetricSecurityKey _key;

            public GenerateTokenService(IConfiguration configuration)
            {
                _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"]));
            }

            public string TokenGenerate(UserDTO user)
            {
                string token = string.Empty;

                //User identity
                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.NameId,user.UserID.ToString()),
                    new Claim(ClaimTypes.Role,user.UserRole),
                };

                //Signature algorithm
                var cred = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256);

                //Assembling the token details
                var tokenDescription = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(3),
                    SigningCredentials = cred
                };

                //Using the handler to generate the token
                var tokenHandler = new JwtSecurityTokenHandler();
                var myToken = tokenHandler.CreateToken(tokenDescription);
                token = tokenHandler.WriteToken(myToken);
                return token;
            }
        }
    }
